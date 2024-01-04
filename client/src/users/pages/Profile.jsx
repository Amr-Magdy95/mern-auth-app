import { selectUser } from "../../redux/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from "../../redux/user/userSlice";

const Profile = () => {
  const { currentUser, loading, error } = useSelector(selectUser);
  const dispatch = useDispatch();
  const fileUploadRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imageProgress, setImageProgress] = useState(0);
  const [imageError, setImageError] = useState(null);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(
        `http://localhost:3000/api/user/update/${currentUser._id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data);
      updateUserSuccess(data);
    } catch (err) {
      updateUserFailure(err);
    }
  };

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageProgress(Math.round(progress));
        console.log(progress);
      },
      (err) => setImageError(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFormData({ ...formData, profilePicture: url });
        });
      }
    );
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `http://localhost:3000/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data);
      dispatch(deleteUserSuccess());
    } catch (err) {
      dispatch(deleteUserFailure(err));
    }
  };
  const logout = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/signout", {
        method: "GET",
        credentials: "include",
      });
      dispatch(signOut());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 ">Profile</h1>
      <form className="flex flex-col  gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/.*"
          ref={fileUploadRef}
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={
            formData?.profilePicture
              ? formData.profilePicture
              : currentUser.profilePicture
          }
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileUploadRef.current.click()}
        />
        <p className="">
          {" "}
          {imageError ? (
            <span className="text-red-700">Error Uploading Image</span>
          ) : imageProgress > 0 && imageProgress < 100 ? (
            <span className="text-slate-700">{`Uploading: ${imageProgress}%`}</span>
          ) : null}
        </p>
        <input
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer" onClick={handleDelete}>
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer" onClick={logout}>
          Signout
        </span>
      </div>
      <p className="text-red-700 mt-5"> {error && "Something Went Wrong"}</p>
    </div>
  );
};

export default Profile;
