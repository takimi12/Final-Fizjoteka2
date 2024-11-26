import { Poppins as NextPoppins } from 'next/font/google'

export const Poppins = NextPoppins({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-primary' // będzie dostępny w css pod tą zmienną
})

