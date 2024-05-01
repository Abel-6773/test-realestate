import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Loading from "../Components/UI/Loading";
import ListingItem from "../Components/Category/ListingItem";

export default function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //get reference
        const listingRef = collection(db, "listings");
        const listings = [];

        //create query
        const q = query(
          listingRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(1)
        );

        //execute query
        const querySnap = await getDocs(q);
        const lastListing = querySnap.docs[querySnap.docs.length - 1];

        querySnap.forEach((doc) => {
          listings.push({ id: doc.id, data: doc.data() });
        });
        setListings(listings);
        setLastFetchedListing(lastListing);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListings();
  }, []);

  const onGetMoreListing = async () => {
    try {
      //get reference
      const listingRef = collection(db, "listings");
      let newListings;

      //create query
      const q = query(
        listingRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(1)
      );

      //execute query
      const querySnap = await getDocs(q);
      const lastListing = querySnap.docs[querySnap.docs.length - 1];

      querySnap.forEach((doc) => {
        return (newListings = { id: doc.id, data: doc.data() });
      });
      // console.log(newListings);
      if (lastListing == undefined) {
        return toast.error("no more listings");
      }
      setLastFetchedListing(lastListing);
      setListings((c) => {
        return [...c, newListings];
      });
      console.log(lastListing);
      setLoading(false);
    } catch (error) {
      toast.error("could not fetch more listing");
    }
  };
  // console.log(listings);
  return (
    <div className="category">
      <header className="pageHeader">
        <p>
          {params.categoryName == "rent"
            ? "Places for rent"
            : "Places for sale"}
        </p>
      </header>
      {loading ? (
        <Loading />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>
          <br />
          <br />
          {lastFetchedListing && (
            <p className="loadMore" onClick={onGetMoreListing}>
              Load More
            </p>
          )}
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  );
}
