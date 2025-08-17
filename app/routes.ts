import { type RouteConfig, route, layout, index } from "@react-router/dev/routes";

export default [
    route('/sign-in', 'routes/root/signIn.tsx'),
    route('api/create-trip', 'routes/api/CreateTrip.ts'),
    layout('routes/admin/adminLayout.tsx',[
        route('/dashboard', 'routes/admin/Dashboard.tsx'),
        route('/all-users', 'routes/admin/Users.tsx'),
        route('/trips', 'routes/admin/Trips.tsx'),
        route('/trips/create', 'routes/admin/CreateTrip.tsx'),
        route('/trips/:id', 'routes/admin/TripDetails.tsx'),
    ]),
    layout('routes/root/PageLayout.tsx', [

        index('routes/root/TravelPage.tsx'),
    ])
] satisfies RouteConfig;