import localFont from 'next/font/local'

export const customFonts = localFont({
  variable: '--custom-font',
  src: [
    {
      path: './web/woff2/Farhang2-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: './web/woff2/Farhang2-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: './web/woff2/Farhang2-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './web/woff2/Farhang2-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './web/woff2/Farhang2-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './web/woff2/Farhang2-DemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './web/woff2/Farhang2-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './web/woff2/Farhang2-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: './web/woff2/Farhang2-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
})