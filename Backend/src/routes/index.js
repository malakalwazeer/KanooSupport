import { getAllListingsRoute } from './getAllListings';
import { getListingRoute } from './getListing';
import { addViewToListingRoute } from './addViewToListing';
import { createNewListingRoute } from './createNewListing';
import { updateListingRoute } from './updateListing';
import { deleteListingRoute } from './deleteListing';
import listingsRoute from './listings';



export default [
    getAllListingsRoute,
    getListingRoute,
    addViewToListingRoute,
    createNewListingRoute,
    updateListingRoute,
    deleteListingRoute,
    listingsRoute
];
