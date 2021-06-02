import React from 'react';
import { getSession } from 'next-auth/client';

export const AuthMiddleware = (WrappedComponent) => class MiddlewareAuth extends React.Component {

    static async getInitialProps(context) {
        const session = await getSession(context);
        if (session) {
            const componentProps = WrappedComponent.getInitialProps
                && (await WrappedComponent.getInitialProps(ctx));
            return { ...componentProps };
        }
        context.res.writeHead(302, { Location: `/login?redirect=${context.req.url}` });
        context.res.end();
    }

    render() {
        return (
            <WrappedComponent {...this.props} />
        );
    }
};
