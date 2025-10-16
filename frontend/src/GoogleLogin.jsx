import { useGoogleLogin } from '@react-oauth/google'
import { googleAuth } from './api'
import { useNavigate } from 'react-router-dom'

const GoogleLogin = () => {
    const navigate = useNavigate();

    const responseGoogle = async (authResult) => {
        try {
            if (authResult['code']) {
                const result = await googleAuth(authResult['code']);
                const { email, name, image } = result.data.user;
                // console.log("result.data.user---" , result.data.user);
                const token = result?.data?.token;
                const obj = { email, name, image, token };
                localStorage.setItem('user-info', JSON.stringify(obj));
                console.log(token);
                console.log("User received from backend:", result?.data?.user || "No user received");
                navigate('/dashboard');
            }
            // console.log(authResult);
        } catch (err) {
            console.error("Error while requesting google code: ", err);
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: (response) => responseGoogle(response),
        onError: (error) => console.error("Google login failed:", error),
        flow: 'auth-code'
    });

    return (
        <div className='App'>
            <button onClick={googleLogin}>Login With Google</button>
        </div>
    )
}

export default GoogleLogin

        // const googleLogin = useGoogleLogin({
        //     onSuccess: responseGoogle,
        //     onError: responseGoogle,
        //     flow: 'auth-code'
        // });