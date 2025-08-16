import { type RouteConfig, route, layout } from "@react-router/dev/routes";

export default [
    route('/sign-in', 'routes/root/signIn.tsx'),
    layout('routes/admin/adminLayout.tsx',[
        route('/dashboard', 'routes/admin/dashboard.tsx'),
        route('/all-users', 'routes/admin/Users.tsx'),
        route('/trips', 'routes/admin/Trips.tsx'),
        route('/trips/create', 'routes/admin/CreateTrip.tsx'),
    ])
] satisfies RouteConfig;