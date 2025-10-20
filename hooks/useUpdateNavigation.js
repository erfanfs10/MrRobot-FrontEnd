'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useNavigation } from '@/contexts/NavigationContext';

export default function useUpdateNavigation(items) {
    const { setNavigations } = useNavigation();
    const pathname = usePathname();

    useEffect(() => {
        setNavigations(prev => [prev[0], ...items]);
    }, [JSON.stringify(items), pathname]);

    return null;
}
