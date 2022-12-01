import Image from 'next/image';
import Link from "next/link";
import errorImg from "../img/error.gif";
import error from "../styles/error.module.scss";

const ErrorPage = () => {

    return (
        <div className={error.error}>
            <Image
                src={errorImg}
                alt="error"
            />
            <Link href="/">
                Go Home
            </Link>
        </div>
    )
}
export default ErrorPage;