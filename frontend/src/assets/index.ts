// Source assets (Processed by Vite, hashed for caching)
import { type FC, type SVGProps } from 'react';

// SVG Component Support: This is allow to manipulate them with props     
// <Assets.icons.ReactComponent className="w-8 h-8 text-blue-500"

// How to use assets in your components:
// import Assets from '@/assets';

// 1. As a React Component (SVG)
// <Assets.icons.ViteComponent />

// 2. As a standard URL (for <img> tags)
// <img src={Assets.images.hero} alt="Hero" />

// Images
import heroImage from './images/hero.png';

// SVGs as URLs (Standard)
import reactLogoUrl from './icons/react.svg';
import viteLogoUrl from './icons/vite.svg';

// SVGs as React Components (Requires vite-plugin-svgr)
// The ?react suffix is used for SVGR. Vite v4/5+ uses this protocol.
import ReactLogo from './icons/react.svg?react';
import ViteLogo from './icons/vite.svg?react';

// Industry standard typing for the assets manifest
export interface AssetManifest {
    images: {
        hero: string;
    };
    icons: {
        react: string;
        vite: string;
        ReactComponent: FC<SVGProps<SVGSVGElement>>;
        ViteComponent: FC<SVGProps<SVGSVGElement>>;
    };
}

export const Assets: AssetManifest = {
    images: {
        hero: heroImage,
    },
    icons: {
        react: reactLogoUrl,
        vite: viteLogoUrl,
        ReactComponent: ReactLogo,
        ViteComponent: ViteLogo,
    },
};

export default Assets;
