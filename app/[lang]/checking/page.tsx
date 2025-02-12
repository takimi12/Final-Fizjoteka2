'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../Redux/Cartslice';

export default function ContinuePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearCart());
    }, [dispatch]);

    useEffect(() => {
        const orderId = searchParams.get('orderId');
        if (!orderId) {
            router.push('/error');
            return;
        }

        const checkStatus = async () => {
            try {
                const response = await fetch(`/api/przelewy24/status?orderId=${orderId}`);
                const data = await response.json();
                
                if (data.state === 'success') {
                    router.push('/success');
                } else {
                    router.push('/error');
                }
            } catch {
                router.push('/error');
            }
        };

        checkStatus();
    }, [searchParams, router]);

    return null;
}
