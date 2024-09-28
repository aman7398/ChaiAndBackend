import { asyncHandler } from "../utils/asynchandlar.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { cloudinary } from "../utils/cloudnary.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend forms
  // validation check --
  // check if user already exist: username email
  // check image image avtar
  // upload to cloudinary avtar
  // create user -- object create entry in db
  // remove refresh token and password field from responce
  // check for user creation
  // return res
  const { fullName, username, email, password } = req.body;
  console.log("email", email);
  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "all field are requied");
  }
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "user already exist");
  }

  const avtarLocalPath = req.files?.avtar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avtarLocalPath) {
    throw new ApiError(400, "avtart file is required");
  }
  const avtar = await cloudinary(avtarLocalPath);
  const coverImage = await cloudinary(coverImageLocalPath);

  if (!avtar) {
    throw new ApiError(400, "avtart file is required");
  }

  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    email,
    password,
    avtar: avtar.url,
    coverImage: coverImage?.url || "",
  });
  const createdUser = await User.findById(user_id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while creating user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, "user created successfully", createdUser));
});

export { registerUser };
