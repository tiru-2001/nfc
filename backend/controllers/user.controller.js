import Counter from '../database/counter.schema.js';
import user from '../database/user.schema.js';
import User from '../database/user.schema.js';
const addUserData = async (req, res) => {
  try {
    const { name, phone, email, faceBookLink, instagramLink, twitterLink } =
      req.body;
    if (
      !name ||
      !phone ||
      !email ||
      !faceBookLink ||
      !twitterLink ||
      !instagramLink
    ) {
      return res.status(400).send({
        message: 'Please fill the form completely',
        success: false,
      });
    }

    const checkUserExist = await User.findOne({ email });
    if (checkUserExist) {
      return res.status(400).send({
        message: 'User already exist',
        success: false,
      });
    }
    let counter = await Counter.findOneAndUpdate(
      { name: 'userCounter' },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    const newUser = await new User({
      name,
      phone,
      email,
      faceBookLink,
      instagramLink,
      twitterLink,
    }).save();
    const profileLink =
      `http://localhost:8700/api/v1/user/${newUser.name}${counter.count}`
        .split(' ')
        .join('');

    const getUserToUpdate = await user.findOneAndUpdate(
      { email },
      { $set: { link: profileLink } },
      { new: true }
    );

    return res.status(200).send({
      message: 'user created successfully',
      success: true,
      getUserToUpdate,
    });
  } catch (e) {
    return res.status(400).send({
      message: 'user ',
    });
    console.log(e);
  }
};

const getUserData = async (req, res) => {
  try {
    const { userInfo } = req.params;
    const checkUserExist = await user.findOne({ link: { $regex: userInfo } });
    if (!checkUserExist) {
      return res.status(404).send({
        message: 'User not found',
        success: false,
      });
    }
    return res.status(200).send({
      message: 'User has been fetched successfully',
      status: true,
      checkUserExist,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export { getUserData, addUserData };
