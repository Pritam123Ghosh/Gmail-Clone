import Email from "../model/email.js"

export const saveSentEmails = (request, response) => {
    try {
        const email = new Email(request.body);
        email.save();
        response.status(200).json("Email saved successfully")
    } catch (error) {
        response.status(500).json(error.message)
    }
}

export const getEmails = async (request, response) => {
    try {
        let emails;
        if (request.params.type === "bin") {
            emails = await Email.find({ bin: true })
        }
        else if (request.params.type === "allmail") {
            emails = await Email.find({})
        } else if (request.params.type === "starred") {
            emails = await Email.find({ starred: true, bin: false })
        }
        else {
            emails = await Email.find({ type: request.params.type });
        }
        return response.status(200).json(emails)
    } catch (error) {
        console.log(error);
        response.status(500).json(error.message)
    }
}

export const moveEmailsToBin = async (request, response) => {
    try {
        await Email.updateMany({ _id: { $in: request.body } }, { $set: { bin: true, starred: false, type: '' } })
        return response.status(200).json("Emails moved to bin")
    } catch (error) {
        console.log(error);
        response.status(500).json(error.message)
    }
}


export const toggleStarredEmails = async (request, response) => {
    try {
        await Email.updateOne({ _id: request.body.id }, { $set: { starred: request.body.value } })
        return response.status(200).json("Email starred/unstarred successfully")
    } catch (error) {
        console.log(error);
        response.status(500).json(error.message)
    }
}

export const deleteEmails = async (request, response) => {
    try {
        await Email.deleteMany({ _id: { $in: request.body } })
        response.status(200).json('emails deleted successfully');
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const searchEmails = async (request, response) => {
    try {
        // let data = await Email.find();
        // response.send(data)
        let emails = await Email.find({ subject: { $regex: request.params.key, $options: 'i' } })
        return response.status(200).json(emails)
    } catch (error) {
        console.log(error);
        response.status(500).json(error.message)
    }
}