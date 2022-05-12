import React from "react";

const Suspense = (Component: React.LazyExoticComponent<React.FC<any>>) => (props: any) => (
    <React.Suspense fallback={<span>Loading...</span>}>
        <Component {...props} />
    </React.Suspense>
);

export const Demo1 = Suspense(React.lazy(() => import('pages/Demo1')));
export const Demo2 = Suspense(React.lazy(() => import('pages/Demo2')));
export const Demo3 = Suspense(React.lazy(() => import('pages/Demo3')));
