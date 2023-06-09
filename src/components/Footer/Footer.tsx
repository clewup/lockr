import moment from 'moment';
import Link from 'next/link';

const Footer = () => {
    return (
        <div className="h-[5vh] flex items-center justify-between px-5 bg-base-200">
            <p className="font-bold">© {moment().year()} Lockr</p>
            <span className="flex gap-10">
                <Link href="/privacy">
                    <p>Privacy Policy</p>
                </Link>
                <Link href="/terms">
                    <p>Terms of Service</p>
                </Link>
            </span>
        </div>
    );
};

export default Footer;
