import React from 'react';
import checkAuth from '../lib/auth';

export const WithAuthSync = (WrappedComponent) => class MiddlewareAuth extends React.Component {

    static async getInitialProps(ctx) {
        let token = ctx.req.headers.cookie;
        await checkAuth(ctx, token);
        const componentProps = WrappedComponent.getInitialProps
            && (await WrappedComponent.getInitialProps(ctx));
        return { ...componentProps };
    }

    render() {
        return (
            <WrappedComponent {...this.props} />
        );
    }
};