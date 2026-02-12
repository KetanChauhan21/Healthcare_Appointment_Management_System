import doctorModel from "../Models/doctor.model.js";

const changeAvailablity = async (req, res) => {
    try {
        const { docID } = req.body;
        const docData = await doctorModel.findById(docID);
        await doctorModel.findByIdAndUpdate(docID, { available: !docData.available });
        res.json({ success: true, message: "Doctor availability changed successfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
        console.log(error.message)
    }
}

const doctorlist = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-email', '-password']);
        res.json({ success: true, Doctors: doctors })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
        console.log(error.message)
    }
}

export { changeAvailablity, doctorlist };