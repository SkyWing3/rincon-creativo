import { ImgHTMLAttributes } from 'react';
import appLogo from '../../src/logo.png';

export default function ApplicationLogo(
    props: ImgHTMLAttributes<HTMLImageElement>,
) {
    return (
        <img
            {...props}
            src={appLogo}
            alt="Rincón Creativo"
            loading="lazy"
        />
    );
}
