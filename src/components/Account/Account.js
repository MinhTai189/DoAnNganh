import React, { useRef } from 'react'
import './Account.css'
import { AiOutlineCloseSquare } from 'react-icons/ai'

export default function Account(props) {
    const { handleAccountForm,
        isOpenAccountForm,
        handleSignInForm,
        isErrorAccount,
        handleSignUpForm,
        errorsSignUp } = props;

    const signIn = useRef();
    const signUp = useRef();
    const clickSignUp = useRef();

    const accountSignIn = useRef();
    const passwordSignIn = useRef();

    const accountSignUp = useRef();
    const emailSignUp = useRef();
    const passwordSignUp = useRef();
    const confirmPasswordSignUp = useRef();

    // =============xử lý trượt slide đăng nhập, đăng kí==============
    const handleSignUp = () => {
        clickSignUp.current.classList.add("signup");
        signIn.current.classList.add('active');
        signUp.current.classList.add('active');
    }

    const handleSignIn = () => {
        clickSignUp.current.classList.remove("signup");
        signIn.current.classList.remove('active');
        signUp.current.classList.remove('active');
    }

    // ==============xử lý form đăng nhập==============
    const onSubmitSignIn = (e) => {
        e.preventDefault();
        const userName = accountSignIn.current.value;
        const password = passwordSignIn.current.value;
        handleSignInForm(userName, password);
    }

    // ===============xử lý form đăng kí===============
    const onSubmitSignUp = (e) => {
        e.preventDefault();

        const account = accountSignUp.current.value;
        const email = emailSignUp.current.value;
        const pass = passwordSignUp.current.value;
        const confirm = confirmPasswordSignUp.current.value;

        handleSignUpForm(account, email, pass, confirm);
    }

    // ==============xóa dữ liệu trên input khi đóng form===========
    if (isOpenAccountForm) {
        accountSignIn.current.value = '';
        passwordSignIn.current.value = '';

        accountSignUp.current.value = '';
        emailSignUp.current.value = '';
        passwordSignUp.current.value = '';
        confirmPasswordSignUp.current.value = '';
    }

    return (
        <article id="account" className={isOpenAccountForm ? 'active' : ''}>
            <div className="account-container">
                <div className="icon-container">
                    <AiOutlineCloseSquare className="icon" onClick={() => handleAccountForm()} />
                </div>
                <div className="item-container" ref={clickSignUp}>
                    <h2 onClick={() => handleSignIn()}>Đăng nhập</h2>
                    <h2 onClick={() => handleSignUp()}>Đăng ký</h2>
                </div>
                <div className="form-container">
                    <div className="form-wrapper signin" ref={signIn}>
                        <h3 className={isErrorAccount ? 'err show' : 'err'}>&#x26A0; Tài khoản hoặc Mật khẩu không chính xác!</h3>
                        <form action="" onSubmit={onSubmitSignIn}>
                            <div className="label">
                                <input type="text" name="uernameSignin"
                                    id="userName-signin" ref={accountSignIn} required />
                                <span>Tài khoản</span>
                            </div>

                            <div className="label">
                                <input type="password" name="passwordSignin"
                                    id="password-signin" ref={passwordSignIn} required />
                                <span>Mật khẩu</span>
                            </div>

                            <button className="btn" type="submit">Đăng nhập</button>
                        </form>
                    </div>

                    <div className="form-wrapper signup" ref={signUp}>
                        <form action="" onSubmit={onSubmitSignUp}>
                            <div className="label" data-wrong={errorsSignUp.userName}>
                                <input type="text" name="uername" id="userName-signup"
                                    ref={accountSignUp} required />
                                <span>Tài khoản</span>
                            </div>

                            <div className="label" data-wrong={errorsSignUp.email}>
                                <input type="email" name="email" id="email-signup"
                                    ref={emailSignUp} required />
                                <span>Email</span>
                            </div>

                            <div className="label" data-wrong={errorsSignUp.pass}>
                                <input type="password" name="password" id="password-signup"
                                    ref={passwordSignUp} required />
                                <span>Mật khẩu</span>
                            </div>

                            <div className="label" data-wrong={errorsSignUp.confirm}>
                                <input type="password" name="passwordConfirm" id="passwordConfirm-signup"
                                    ref={confirmPasswordSignUp} required />
                                <span>Xác nhận mật khẩu</span>
                            </div>

                            <button className="btn" type="submit">Đăng ký</button>
                        </form>
                    </div>
                </div>
            </div>
        </article>
    )
}
