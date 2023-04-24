import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Avatar, progress } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { AuthContext } from "../../AppContext/AppContext";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import {
  PostsReducer,
  postActions,
  postsStates,
} from "../../AppContext/postReducer";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import PostCards from "./PostCards";
import { Alert } from "@material-tailwind/react";

const MainContainer = () => {
  const { user, userData } = useContext(AuthContext);
  const text = useRef("");
  const scrollRef = useRef("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const collectionRef = collection(db, "posts");
  const postRef = doc(collection(db, "posts"));
  const document = postRef.id;
  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const { SUBMIT_POST, HANDLE_ERROR } = postActions;
  const [progressBar, setProgressBar] = useState(0);

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (text.current.value !== "") {
      try {
        await setDoc(postRef, {
          documentId: document,
          uid: user?.uid || userData?.uid,
          logo: user?.photoURL,
          name: user?.displayName || userData?.name,
          email: user?.email || userData?.email,
          text: text.current.value,
          image: image,
          timestamp: serverTimestamp(),
        });
        text.current.value = "";
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    } else {
      dispatch({ type: HANDLE_ERROR });
    }
  };

  const storage = getStorage();

  const metadata = {
    contentType: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ],
  };

  const submitImage = async () => {
    const fileType = metadata.contentType.includes(file["type"]);
    if (!file) return;
    if (fileType) {
      try {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(
          storageRef,
          file,
          metadata.contentType
        );
        await uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgressBar(progress);
          },
          (error) => {
            alert(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                setImage(downloadURL);
              }
            );
          }
        );
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    const postData = async () => {
      const q = query(collectionRef, orderBy("timestamp", "asc"));
      await onSnapshot(q, (doc) => {
        dispatch({
          type: SUBMIT_POST,
          posts: doc?.docs?.map((item) => item?.data()),
        });
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
        setImage(null);
        setFile(null);
        setProgressBar(0);
      });
    };
    return () => postData();
  }, [SUBMIT_POST]);

  return (
    <div className="flex flex-col justify-center items-center my-3 ">
      <div className="flex justify-center items-center  w-[80%]   ">
        <div className="  flex flex-col py-4 w-full bg-white   rounded-lg shadow-xl ">
          <Avatar
            size="sm"
            variant="circular"
            src={user?.photoURL}
            alt="avatr"
            className="mx-2"
          ></Avatar>
          <form className="w-full" onSubmit={handleSubmitPost}>
            <div className="  block justify-between items-center ">
              <div className="w-full ml-4 my-2">
                <input
                  type="text"
                  name="text"
                  ref={text}
                  placeholder={`whats in your mind? ${
                    user?.displayName?.split(" ")[0] ||
                    userData?.name?.charAt(0).toUpperCase() +
                      userData?.name?.slice(1)
                  }`}
                  className="outline-none w-[80%]  bg-white rounded-md border border-black px-3"
                />
              </div>
              <div className="mx-4 border border-black rounded-lg h-28 flex justify-center items-center">
                {image ? (
                  <img
                    className="h-24 rounded-xl items-center"
                    src={image}
                    alt="previewImage"
                  />
                ) : (
                  <p className="text-center">Preview Image/Uplaod Image </p>
                )}
              </div>
              <div className="mr-4 mx-3 my-3">
                <Button variant="gradient" type="submit" size="sm">
                  Share
                </Button>
              </div>
            </div>
          </form>
          <span
            className="mx-3 bg-blue-700 rounded-md w-10 my-3"
            style={{
              width: `${progressBar}%`,
              height: "3px",
              margin: "0 1px",
              marginTop: "3px",
            }}
          ></span>
          <div className="flex justify-around items-center pt-4">
            <div className="flex items-center my-3">
              <label
                htmlFor="addImage"
                className="cursor-pointer flex items-center"
              >
                <img
                  className="w-10 sm:w-20"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Icons8_flat_add_image.svg/1024px-Icons8_flat_add_image.svg.png"
                  alt="addImage"
                />
              </label>
              <input
                type="file"
                id="addImage"
                style={{ display: "none" }}
                onChange={handleUpload}
              />

              {file && (
                <Button variant="outlined" size="sm" onClick={submitImage}>
                  Upload
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center  py-4 w-full">
        {state.error ? (
          <div className="flex justify-center items-center">
            <Alert color="red">
              Something went wrong refresh and try again...
            </Alert>
          </div>
        ) : (
          <div className="flex flex-col items-center  py-4 w-full">
            {state.posts.length != 0 &&
              state?.posts?.map((post, index) => (
                <PostCards
                  key={index}
                  logo={post.logo}
                  id={post.documentId}
                  uid={post?.uid}
                  name={post.name}
                  email={post.email}
                  image={post.image}
                  text={post.text}
                  timestamp={new Date(post?.timestamp?.toDate())?.toDateString()}
                />
              ))}
          </div>
        )}
      </div>
      <div ref={scrollRef}></div>
    </div>
  );
};

export default MainContainer;
