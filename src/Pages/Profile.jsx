import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import {
  updateDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ListingItem from "../Components/Category/ListingItem";
import homeIcon from "../assets/svg/homeIcon.svg";
import Loading from "../Components/UI/Loading";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [changeDetails, setChangeDetails] = useState(false);
  const [myListings, setMyListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  useEffect(() => {
    const getMyListing = async () => {
      let myListings = [];
      const q = query(
        collection(db, "listings"),
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        myListings.push({ id: doc.id, data: doc.data() });
      });
      setMyListings(myListings);
      setLoading(false);
    };

    getMyListing();
  }, []);

  const logout = () => {
    auth.signOut();
    navigate("/");
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== user.name) {
        //update display name in fb
        await updateProfile(auth.currentUser, {
          displayName: user.name,
        });

        //update in firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name: user.name,
        });
      }
    } catch (error) {
      toast.error("error");
    }
  };

  const onChange = (e) => {
    setUser((c) => {
      return { ...c, [e.target.id]: e.target.value };
    });
  };

  const onDelete = async (listingId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "listings", listingId));
      const updatedListings = myListings.filter(
        (listing) => listing.id !== listingId
      );
      setMyListings(updatedListings);
      toast.success("Successfully deleted listing");
    }
  };

  return (
    <div className="profile">
      <header className="profileHeader">
        <h1 className="pageHeader">My Profile</h1>
        <button type="button" className="logOut" onClick={logout}>
          Logout
        </button>
      </header>
      <main>
        <section>
          <div className="profileDetailsHeader">
            <p className="profileDetailsText">Personal Details</p>
            <p
              className="changePersonalDetails"
              onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails((c) => !c);
              }}
            >
              {changeDetails ? "Done" : "Change"}
            </p>
          </div>

          <div className="profileCard">
            <form>
              <input
                type="text"
                id="name"
                className={changeDetails ? "profileNameActive" : "profileName"}
                disabled={!changeDetails}
                value={user.name}
                onChange={onChange}
              />
              <input
                type="text"
                id="emal"
                className={
                  changeDetails ? "profileEmailActive" : "profileEmail"
                }
                disabled={!changeDetails}
                value={user.email}
                onChange={onChange}
              />
            </form>
          </div>
          <NavLink to="/create-listing" className="createListing">
            <img src={homeIcon} alt="home" />
            <p>Sell or rent your home</p>
            <img src={arrowRight} alt="arrow right" />
          </NavLink>
          {!loading && myListings?.length > 0 && (
            <>
              <p className="listingText">Your Listings</p>
              <ul className="listingsList">
                {myListings.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                    onDelete={() => onDelete(listing.id)}
                    onEdit={() => onEdit(listing.id)}
                  />
                ))}
              </ul>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
