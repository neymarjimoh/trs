const statusCode = require('http-status');
const { User } = require('../models');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user', is_verified: true }).populate("bookings", "train train_class ticket_type").select("-password -__v");
        return res.status(statusCode.OK).json({
            message: `${users.length} ${users.length > 1 ? `Users`: `user`} found`,
            users
        });
    } catch (error) {
        console.log("error from getting all users >>>>> ", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong. Try again."
        });
    }
};

exports.getSingleUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (req.user.id !== userId || req.user.role !== 'admin') {
            return res.status(statusCode.UNAUTHORIZED).json({ 
                message: "Unauthorised, you can only view your account" 
            });
        }
        const user = await User.findById(userId).select('-password -__v -role');
        if (!user) {
            return res.status(statusCode.NO_CONTENT).json({
                message: 'No valid entry found for the provided id'
            });
        }
        return res.status(statusCode.OK).json({
            message: `${user.role === `admin` ? `User fetched successfully` : `Your Profile`}`,
            data: user
        });
    } catch (error) {
        console.log("error from getting a user >>>>> ", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong. Try again."
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (req.user.id !== userId) {
            return res.status(statusCode.UNAUTHORIZED).json({ 
                message: "Unauthorised, you can only update your account" 
            });
        }
        const updatedUser =  await User.findByIdAndUpdate(
            userId, 
            req.body,
            { 
                new: true
            }
        ).select('-password -__v -role');
        if (!updatedUser) {
            return res.status(statusCode.NOT_FOUND).json({
                message: 'User does not exist or has already been deleted.'
            });
        }
        return res.status(statusCode.OK).json({
            message: 'Your account updated successfully', 
            user: updatedUser 
        });
    } catch (error) {
        console.log("error from updating user >>>>> ", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong. Try again."
        });
    }
};

exports.deleteAllUsers = async (req, res) => {
    try {
        const users = await User.deleteMany({ role: 'user' });
        if (users.length === 0) {
            return res.status(statusCode.NOT_FOUND).json({ 
                message: "No registered users available" 
            });
        }
        return res.status(statusCode.OK).json({
            message: "Users deleted successfully"
        });
    } catch (error) {
        console.log("error from deleting all users >>>>>", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong. Try again."
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (req.user.id !== userId || req.user.role !== 'admin') {
            return res.status(statusCode.UNAUTHORIZED).json({ 
                message: "Unathorised, you can't delete someone's account" 
            });
        }
        const deletedUser = await User.findByIdAndRemove(
            userId,
            {
                useFindAndModifiy: false
            }
        );
        if (!deletedUser) {
            return res.status(statusCode.NOT_FOUND).json({
                message: "User does not exist or has already been deleted"
            });
        }
        return res.status(statusCode.OK).json({
            message: "User deleted successfully"
        });
    } catch (error) {
        console.log("error from user deletion >>>>> ", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong. Try again."
        });
    }
};