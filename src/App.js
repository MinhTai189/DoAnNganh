import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import fire from './firebase'
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import TourDetailPage from './pages/TourDetailPage';
import AllTourPage from './pages/AllTourPage';
import Userbar from './components/Userbar/Userbar';
import CartPage from './pages/CartPage';
import TourManage from './components/TourManage/TourManage';


// ========kiểm tra tên tài khoản============
function checkUserName(userName) {
  return /^[0-9a-zA-Z]+$/.test(userName)
}

// ===========kiểm tra email===============
function checkEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// ==========kiểm tra password=============
function checkPassword(pass) {
  const template = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  return pass.match(template);
}

// ============xử lý số lượng tour trong giỏ hàng============
const handleAmountItemCart = (cart, id) => {
  let same = false;
  if (cart === 0)
    return [{
      tour: id,
      soghe: 1
    }]
  else {
    const temp = cart.reduce((arr, item) => {
      if (item.tour === id) {
        arr.push({
          tour: id,
          soghe: (item.soghe + 1)
        })
        same = true;
      }
      else {
        arr.push({
          tour: item.tour,
          soghe: item.soghe
        })
      }
      return arr
    }, []);
    !same && temp.push({
      tour: id,
      soghe: 1
    })
    return temp;
  }
}

// ==========xứ lý dữ liệu trong ô tìm kiếm header============
function removeAccents(str) {
  return str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .trim()
    .replace(/[^a-zA-Z ]/g, "")
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

// ===========định dạng ngày mm/dd/yyyy=============
const formatTime = (time) => {
  const temp = time.split(/\//);
  return [temp[1], temp[0], temp[2]].join('/')
}

export default function App() {
  const [dataToursRoot, setDataToursRoot] = useState({});
  const [dataWorkingTourRoot, setDataWorkingTourRoot] = useState([]);
  const [dataAccountsRoot, setDataAccountsRoot] = useState([]);
  const [searchTour, setSearchTour] = useState([]);
  const [dataTourDetail, setDataTourDetail] = useState({});
  const [dataAllTour, setDataAllTour] = useState([]);
  const [isOpenAccountForm, setIsOpenAccountForm] = useState(false);
  const [isSignInSuccess, setIsSignInSuccess] = useState(false);
  const [accountSignSuccess, setAccountSignSuccess] = useState({});
  const [isErrorAccount, setIsErrorAccount] = useState(false);
  const [errorsSignUp, setErrorsSignUp] = useState({
    userName: '',
    email: '',
    pass: '',
    confirm: ''
  })
  const [amountTourInCart, setAmountTourInCart] = useState(0);
  const [tourInCart, setTourInCart] = useState([]);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [toggle, setToggle] = useState(false);


  // ===========load dữ liệu từ Firebase về web app===========
  const firebaseHref = fire.database();
  useEffect(() => {
    firebaseHref.ref('/').on("value", snap => {
      setDataAccountsRoot(snap.val().Accounts);
      setDataToursRoot(snap.val().Tours);
      setDataWorkingTourRoot(snap.val().WorkingTour);
    })
  }, [])

  // ===========kiểm tra thời gian khởi hành của các tour, nếu đến thời gian khởi hành thì di chuyển
  //               tour qua bảng WorkingTour===============
  const checkDateTour = () => {
    const { Trongnuoc, Ngoainuoc } = dataToursRoot;
    const allTour = [...Trongnuoc, ...Ngoainuoc];
    const workingTour = [];
    const keyWorkingTour = [];
    allTour.forEach(item => {
      const dateDeparture = new Date(formatTime(item.ngaykhoihanh));
      const dateReturn = new Date(formatTime(item.ngayve));
      const now = Date.now();

      if (dateDeparture <= now) {
        workingTour.push(item);
        keyWorkingTour.push(item.id);
      }
    });

    // cập nhật lại Tours và WorkingTour trong CSDL
    if (workingTour.length > 0) {
      Object.keys(dataWorkingTourRoot)[0] === 'tourdanghoatdong'
        ? firebaseHref.ref('/WorkingTour').set(workingTour)
        : firebaseHref.ref('/WorkingTour').set([...workingTour, ...dataWorkingTourRoot]);

      const foreign = Ngoainuoc.filter(item1 => {
        let temp = true;
        keyWorkingTour.forEach(item2 => {
          if (item1.id === item2) {
            temp = false;
          }
        })
        return temp;
      })

      const domestic = Trongnuoc.filter(item1 => {
        let temp = true;
        keyWorkingTour.forEach(item2 => {
          if (item1.id === item2) {
            temp = false;
            return;
          }
        })
        return temp;
      })

      firebaseHref.ref('/Tours').set({ Trongnuoc: domestic, Ngoainuoc: foreign });
    }
  }

  Object.keys(dataToursRoot).length > 0 && checkDateTour();

  // ===========thêm tour vào CSDL===========
  const addTour = async (tour) => {
    const { Trongnuoc, Ngoainuoc } = { ...dataToursRoot };
    const storageRef = fire.storage().ref('/Images Tour/' + tour.hinh.name);

    await storageRef.put(tour.hinh);
    const srcImg = await storageRef.getDownloadURL();


    const ref = tour.id === 'foreign' ? 'Ngoainuoc' : 'Trongnuoc';
    const temp = tour.id === 'foreign' ? [...Ngoainuoc] : [...Trongnuoc];
    let id = tour.id === 'foreign' ? 'NN' : 'TN';
    id += firebaseHref.ref('/').push().key;
    temp.push({ ...tour, hinh: srcImg, id });

    // ==========cập nhật dữ liệu lên CSDL=============
    firebaseHref.ref('/Tours/' + ref).set(temp).then(() => {
      alert('Đã thêm dữ liệu thành công!');
    });
  }

  // ======================xóa dữ liệu trong CSDL===========================
  const removeData = (id) => {
    let fileImgName;
    const region = id.slice(0, 2) === 'TN' ? 'Trongnuoc' : 'Ngoainuoc';
    const temp = [...dataToursRoot[region]].filter(item => {
      if (item.id === id) {
        fileImgName = item.hinh;
        return false;
      }
      return true;
    })

    fileImgName = fileImgName.slice(90, fileImgName.indexOf('?'));

    //cập nhật lại dữ liệu vào CSDL
    firebaseHref.ref('/Tours/' + region).set(temp).then(() => {

      //xóa ảnh trong CSDL sau khi xóa tour
      const storageRef = fire.storage().ref('/Images Tour/' + fileImgName)

      storageRef.delete().then(() => {
        alert('Đã xóa dữ liệu thành công');
      });
    });
  }

  // ============truyền giá trị tìm kiếm tour trong header==========
  const handleSearchTour = (searchValue) => {
    const { Trongnuoc, Ngoainuoc } = dataToursRoot;
    if (searchValue !== '') {
      searchValue = removeAccents(searchValue);
      const tour = [...Trongnuoc, ...Ngoainuoc].filter(item => {
        const noiden = removeAccents(item.noiden);
        const noikhoihanh = removeAccents(item.noikhoihanh);
        return (noiden.includes(searchValue) || noikhoihanh.includes(searchValue))
      })
      setSearchTour([...tour]);
    }
    else
      setSearchTour([]);
  }

  // ===========truyền giá trị id của chi tiết tour khi click vào=============
  const handleTourDetail = (idTour) => {
    const dataTours = { ...dataToursRoot };
    const region = idTour.slice(0, 2) === 'TN' ? 'Trongnuoc' : 'Ngoainuoc';
    const dataTourId = dataTours[region].find((item) => item.id === idTour);
    setDataTourDetail(dataTourId);
  }

  // ================kiểm tra khi nhấn nút xem thêm==========
  const handleShowMore = (value) => {
    const { Trongnuoc, Ngoainuoc } = { ...dataToursRoot };
    const dataTemp = value === "Trongnuoc" ? [...Trongnuoc] : [...Ngoainuoc];
    setDataAllTour([...dataTemp]);
  }

  // ==========đóng/mở form account==============
  const handleAccountForm = () => {
    setIsOpenAccountForm(!isOpenAccountForm);
    !isOpenAccountForm && setIsErrorAccount(false);
    !isOpenAccountForm && setErrorsSignUp({
      userName: '',
      email: '',
      pass: '',
      confirm: ''
    })
    !isOpenAccountForm && setIsErrorAccount(false);
  }

  // // =============xử lý form đăng nhập=================
  const handleSignInForm = (username, password) => {
    const accounts = [...dataAccountsRoot];
    const account = accounts.filter(item => item.taikhoan === username && item.matkhau === password)[0];

    if (account) {
      setIsSignInSuccess(true);
      setIsErrorAccount(false);
      setIsSignInSuccess(true);
      setIsOpenAccountForm(false);
      setAccountSignSuccess({ ...account });
      let amount = 0;
      (account.cart.length !== 0 && account.cart !== 0) && account.cart.forEach(item => {
        amount += item.soghe;
      })
      setAmountTourInCart(amount);
    }
    else setIsErrorAccount(true);
  }

  // =========xxxxxxxxxx==Xử lý form đăng ký=========xxxxxxxxxxxxxxxxxx======

  // ==========kiểm tra thông tin đăng ký==========
  function checkSignUp(accounts, userName, email, pass, conf) {
    let errUser = '';
    let errEmail = '';
    let errPass = '';
    let errConf = '';

    if (userName.length < 6 || userName.length > 15 || !checkUserName(userName))
      errUser = 'Tên tài khoản phải từ 6 đến 15 ký tự và chỉ chứa ký tự, số';
    else if (accounts.some(item => item.taikhoan === userName)) {
      errUser = 'Tên tài khoản đã tồn tại';
    }

    if (!checkEmail(email))
      errEmail = 'Định dạng: me@example.com';

    if (!checkPassword(pass))
      errPass = 'Mật khẩu phải từ 6 đến 20 ký tự và chứa ít nhất 1 số, 1 ký tự hoa, 1 ký tự thường';

    if (pass !== conf)
      errConf = 'Mật khẩu xác nhận không trùng khớp';

    const errorsSignUp = {
      userName: errUser,
      email: errEmail,
      pass: errPass,
      confirm: errConf
    }
    setErrorsSignUp({ ...errorsSignUp });
    return Object.values(errorsSignUp).every(item => item.length === 0)
  }

  // ==============xử lý form đăng ký==============
  const handleSignUpForm = (username, email, password, confirm) => {
    const accounts = [...dataAccountsRoot];
    if (checkSignUp(accounts, username, email, password, confirm)) {
      const temp = [...accounts, {
        taikhoan: username,
        matkhau: password,
        email: email,
        quyen: 'user',
        cart: 0,
      }];
      firebaseHref.ref('/Accounts').set(temp);
      alert('Đã đăng kí tài khoản thành công!');
    }
  }
  // =============xử lý đặt tour===============
  const handleCart = (idTour) => {
    if (isSignInSuccess) {
      const accounts = [...dataAccountsRoot];
      const accountSinged = { ...accountSignSuccess };
      const { Trongnuoc, Ngoainuoc } = dataToursRoot;
      const allTours = [...Trongnuoc, ...Ngoainuoc];
      let cart = accountSinged.cart === 0 ? 0 : [...accountSinged.cart];
      cart = [...handleAmountItemCart(cart, idTour)];

      const checkAmount = allTours.filter(item1 => {
        let bool = false;
        cart.forEach(item2 => {
          if (item2.tour === item1.id)
            bool = true
        })
        return bool;
      })

      cart = cart.map(item1 => {
        let amount = item1.soghe;
        checkAmount.forEach(item2 => {
          if (item2.id === item1.tour && amount > item2.songuoi)
            amount = item2.songuoi;

        })
        return { ...item1, soghe: amount }
      })

      //set số lượng tour trong giỏ hàng
      updateAmountTourInCart(cart);

      setAccountSignSuccess({ ...accountSinged, cart: [...cart] });
      const temp = { ...accountSinged, cart: [...cart] };


      const newAccounts = accounts.filter(item => item.taikhoan !== accountSinged.taikhoan);
      newAccounts.push(temp);

      //cập nhật lại accounts trong CSDL
      firebaseHref.ref('/Accounts').set(newAccounts);
    }
    else alert('Hãy đăng nhập để thực hiện đặt tour!');
  }

  // =======cập nhật lại item trong giỏ hàng=======
  const updateItemInCart = (cart) => {
    const { Trongnuoc, Ngoainuoc } = dataToursRoot;
    const allTours = [...Trongnuoc, ...Ngoainuoc];
    const temp = cart.length > 0
      ? cart.map(tour => {
        const temp = allTours.find(item => item.id === tour.tour);
        return { ...tour, tour: { ...temp } }
      })
      : []
    setTourInCart(temp);
  }

  // =======cập nhật lại số lượng tour trong giỏ hàng==========
  const updateAmountTourInCart = (cart) => {
    setAmountTourInCart(() => {
      const amount = cart !== 0 ? cart.length : 0;
      return amount
    });
  }

  // ============cập nhật lại danh sách tài khoản=========
  const updateAccounts = () => {
    const newAccounts = dataAccountsRoot.filter(item => item.taikhoan !== accountSignSuccess.taikhoan);
    newAccounts.push({ ...accountSignSuccess });

    //cập nhật lại accounts trong CSDL
    firebaseHref.ref('/Accounts').set(newAccounts);
  }

  // =========xử lý tour trong giỏ hàng============
  const handleClickCart = () => {
    const tours = { ...dataToursRoot };
    if (Object.values(tours).length > 0 && isSignInSuccess && accountSignSuccess.cart !== 0) {
      updateItemInCart(accountSignSuccess.cart);
    }
  }

  // ==========xử lý xóa tour trong giỏ hàng============
  const handleRemoveCart = (id) => {
    if (accountSignSuccess.cart !== 0 && window.confirm("Bạn có thật sự muốn xóa tour đã đặt không?")) {
      const cart = accountSignSuccess.cart.filter(item => item.tour !== id)

      cart.length < 1
        ? setAccountSignSuccess({ ...accountSignSuccess, cart: 0 })
        : setAccountSignSuccess({ ...accountSignSuccess, cart })

      updateItemInCart(cart);
      updateAmountTourInCart(cart);

      //cập nhật lại accounts trong CSDL
      const newAccounts = [...dataAccountsRoot];
      newAccounts.forEach((item, index) => {
        if (item.taikhoan === accountSignSuccess.taikhoan)
          newAccounts[index].cart = cart.length < 1 ? 0 : cart;
      })
      firebaseHref.ref('/Accounts').set(newAccounts);
    }
  }

  // =============cập nhật lại số ghế khi số ghế trong giỏ hàng thay đổi=========
  const handleSeat = (id, currentSeat, maxSeat) => {
    const cart = [...accountSignSuccess.cart];
    let seat = currentSeat;
    if (currentSeat < 1)
      seat = 1;
    if (currentSeat > maxSeat)
      seat = maxSeat;

    cart.forEach((item, index) => {
      if (item.tour === id) {
        cart[index].soghe = seat;
      }
    })

    setAccountSignSuccess({ ...accountSignSuccess, cart })
    updateAmountTourInCart(cart);
    updateItemInCart(cart);
    updateAccounts();
  }

  // ===========thanh toán tour===========
  const handlePayTour = () => {
    const { Trongnuoc, Ngoainuoc } = dataToursRoot;
    const allTours = [...Trongnuoc, ...Ngoainuoc];
    const bool = true;
    let message = '';
    const paidTourDomestic = [];
    const paidTourForeign = [];

    allTours.forEach((item1, index) => {
      let temp = false;
      tourInCart.forEach(item2 => {
        if (item2.tour.id === item1.id) {
          if (item2.soghe > item1.songuoi)
            message += `Tour ${item1.noikhoihanh} - ${item1.noiden} chỉ còn tối đa ${item1.songuoi} chỗ` + '\n';
          else if (item2.soghe <= item1.songuoi) {
            temp = true;
            index < Trongnuoc.length
              ? paidTourDomestic.push({ ...item1, songuoi: item1.songuoi - item2.soghe })
              : paidTourForeign.push({ ...item1, songuoi: item1.songuoi - item2.soghe });
          }
        }
      })
      if (!temp) {
        index < Trongnuoc.length
          ? paidTourDomestic.push(item1)
          : paidTourForeign.push(item1)
      }
    })

    if (message === '') {
      let accounts = dataAccountsRoot;
      const tours = { Trongnuoc: [...paidTourDomestic], Ngoainuoc: [...paidTourForeign] };
      alert('Đã thanh toán thành công!');

      accounts.forEach((item, index) => {
        if (item.taikhoan === accountSignSuccess.taikhoan)
          accounts[index] = { ...accountSignSuccess, cart: 0 }
      })
      setAccountSignSuccess({ ...accountSignSuccess, cart: 0 });
      setTourInCart([]);
      setAmountTourInCart(0);

      //set lại số lượng tour trong CSDL
      firebaseHref.ref('/Tours').set(tours);
      firebaseHref.ref('Accounts').set(accounts);
    }
    else alert(message);
  }

  return (
    <Router>
      {isSignInSuccess && <Userbar
        setIsSignInSuccess={setIsSignInSuccess}
        amountTourInCart={amountTourInCart}
        setAccountSignSuccess={setAccountSignSuccess}
        handleClickCart={handleClickCart}
        accountSignSuccess={accountSignSuccess}
        setToggle={setToggle}
      />}

      <Navbar
        handleAccountForm={handleAccountForm}
        isSignInSuccess={isSignInSuccess}
        isOpenAccountForm={isOpenAccountForm}
        handleAccountForm={handleAccountForm}
        handleSignInForm={handleSignInForm}
        handleSignUpForm={handleSignUpForm}
        isErrorAccount={isErrorAccount}
        errorsSignUp={errorsSignUp}
        toggle={toggle}
        setToggle={setToggle}
      />

      <Switch>

        {/* ===========hiển thị trang chủ============= */}
        <Route exact path="/">
          <Home dataTours={dataToursRoot}
            handleSearchTour={handleSearchTour}
            handleTourDetail={handleTourDetail}
            handleShowMore={handleShowMore}
          />
        </Route>

        {/* =========hiển thị tour tìm kiếm============ */}
        <Route exact path='/tour-finded'>
          <AllTourPage
            dataAllTour={searchTour}
            handleTourDetail={handleTourDetail}
          />
        </Route>

        {/* ============hiển thị chi tiết tour============= */}
        <Route path="/tour-detail">
          <TourDetailPage
            dataTourDetail={dataTourDetail}
            handleCart={handleCart}
          />
        </Route>

        {/* ===========hiển thị tất cả các tour============== */}
        <Route exact path='/all-tour'>
          <AllTourPage
            dataAllTour={dataAllTour}
            handleTourDetail={handleTourDetail}
          />
        </Route>

        {/* ========hiển thị giỏ hàng=========== */}
        {isSignInSuccess && <Route exact path='/cart'>
          <CartPage
            tourInCart={tourInCart}
            handleRemoveCart={handleRemoveCart}
            handleSeat={handleSeat}
            handlePayTour={handlePayTour} />

        </Route>}

        {isSignInSuccess && <Route exact path='/tour-manage'>
          <TourManage
            addTour={addTour}
            dataTours={dataToursRoot}
            dataWorkingTourRoot={dataWorkingTourRoot}
            removeData={removeData}
            setIsUpdateData={setIsUpdateData}
            isUpdateData={isUpdateData} />
        </Route>}

      </Switch>

      <Footer />
    </Router>
  );
}