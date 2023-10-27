//TODO:make sure to handle errors and send appropriate responses
//TODO:use try catch blocks and send 500 status code for internal server error

// TODO:send error jsons in the format {Response:"Error Message"}


//initialize stuff



const express = require('express')
const router = express.Router()

//importing constants
const idFromType = require('./constants')
const typeFromId = require('./constants')

//external imports
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//importing models
const User = require('./models/user')
const Section = require('./models/section')
const Complaint = require('./models/complaints')
const Section_Comments = require('./models/section_comments')
// const Comment = require('./models/comment')
// const Committee = require('./models/committee')
const Committee_Head = require('./models/committee_head')

//middlewares
const fetchUser = require('./middlewares/fetchUser') //to be used for protected routes

//jacky

router.get('/authorize/:id', fetchUser, async (req, res) => {
    try {
        if (req.role == "committee head") {
            const id = req.params.id;
            const section = await Section.findByPk(id);

            if (section) {
                section.is_Authorized = true;
                await section.save();
                return res.status(200).json({ Response: 'User Authorized Successfully' });
            }
            else {
                return res.status(404).json({ Response: 'Section not found' });
            }
        }
        else {
            // If the user's role is not "committee head", send a 403 (Forbidden) response
            return res.status(403).json({ Response: 'Access denied' });
        }
    } catch (error) {
        // Handle any errors that may occur during the process
        console.error(error);
        return res.status(500).json({ Response: 'Server error' });
    }
});

//jacky

router.delete('/rmUser/:id', fetchUser, async (req, res) => {
    try {

        if (req.role === "committee head") {

            const section = await Section.findByPk(req.params.id);

            if (section) {

                await section.destroy();


                return res.status(200).json({ Response: "User Removed" });
            } else {

                return res.status(404).json({ Response: "Section not found" });
            }
        } else {

            return res.status(403).json({ Response: "Access denied" });
        }
    } catch (error) {
        // Handle any errors that may occur during the process
        console.error(error);
        return res.status(500).json({ Response: "Server error" });
    }
});
//manideep
router.put('/changeStatus/:id', async (req, res) => {
    try {
        let data = req.body;
        let complaint = await Complaint.findOne({
            where: {
                Complaint_id: req.params.id
            }
        });
        if (!complaint) {
            return res.status(404).json({ Response: "Complaint not found" });
        }
        complaint.Status = data.status;
        await complaint.save();
        res.json({ Response: "Complaint Status Updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ Response: "Internal Server Error" });
    }
})

//manideep
router.post('/complaint', fetchUser, async (req, res) => {
    try {
        const data = req.body;
        const now = new Date();
        const dated = now.toLocaleDateString();
        let new_complaint;
        if (req.role === "user") {
            new_complaint = await Complaint.create({
                Title: data.title,
                Description: data.description,
                Date_posted: dated,
                Remarks: "",
                Status: "Open",
                Location: data.location,
                User_id: req.current_user.id,
                Committee_Head_id: idFromType[data.type]
            });
        }
        res.json({ Response: "Complaint Added Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ Response: "Internal Server Error" });
    }
})

//alen

async function getComplaint(complaint) {

    var comments = await Section_Comments.findAll({
        where: {
            Complaint_id: complaint.Complaint_id
        }
    });

    let comment_list = []

    for (comment of comments) {

        let section = await Section.findOne({
            where: {
                Section_id: comment.Section_id
            }

        })

        comment_list.push({
            user: section.name,
            designation: section.Designation,
            comment: comment.Comment,
            email: section.Email
        })

    }

    return {
        id: complaint.Complaint_id,
        title: complaint.Title,
        description: complaint.Description,
        status: complaint.Status,
        date: complaint.Date_jed,
        type: "Test",
        remarks: complaint.Remarks,
        comments: comment_list
    }



}


router.get('/complaints', fetchUser, async (req, res) => {

    let current_user = req.current_user
    let role = req.role


    console.log("Hello", current_user, role)

    if (role === "section head") {
        var complaints = await Complaint.findAll({
            where:
            {
                Committee_Head_id: current_user.Committee_Head_id
            }
        });
    } else if (role == "committee head") {
        var complaints = await Complaint.findAll({
            where:
            {
                Committee_Head_id: current_user.id
            }
        });
    } else {
        var complaints = await Complaint.findAll({
            where:
            {
                User_id: current_user.id
            }
        });
    }

    let ans = []
    console.log("complaints", complaints)
    for (complaint of complaints) {
        ans.push(await getComplaint(complaint.dataValues))
    }

    console.log("ans", ans)


    res.json({ Response: "Success", Complaints: ans })
})

//alen
router.route('/complaint/:id')
    .get(async (req, res) => {
        let complaint = await Complaint.findOne({

            where: {
                Complaint_id: req.params.id
            }

        })

        res.json(getComplaint(complaint))
    })
    .put(async (req, res) => {
        let data = req.body
        let complaint = await Complaint.findOne({
            where: {
                Complaint_id: req.params.id
            }
        })
        complaint.Title = data.title
        complaint.Description = data.description
        complaint.Location = data.location
        await complaint.save()
        res.json({ Response: "Complaint Updated" })
    })
    .delete(async (req, res) => {
        let complaint = await Complaint.findOne({
            where: {
                Complaint_id: req.params.id
            }
        })
        await complaint.destroy()
        res.json({ Response: "Complaint Deleted" })
    })



//gautham
router.get('/user/current', fetchUser, async (req, res) => {
    let user = req.current_user
    //make all the keys in user object start with lowercase
    user = {
        ...user,
        name: user.Name,
        email: user.Email,
        department: user.Department
    }
    let role = req.role === "user" ? "User" : req.role

    res.json({ ...user, role: role })

})


//amal
router.post('/signup', async (req, res) => {
    try {
        let data = req.body
        console.log(data)
        let passw = bcrypt.hashSync(data.password, 10)
        if (data.role === "user") {
            //check if user already exists
            exist = await User.findOne({ where: { Email: data.email } })
            if (exist) {
                return res.status(400).json({ Response: "User Already Exists" })
            }



            User.create({
                Name: data.name,
                Department: data.department,
                Email: data.email,
                Password: passw
            })

            //insert into user table
            //send response
        }

        if (data.role == "section head") {
            //check if user already exists
            exist = await Section.findOne({ where: { Email: data.email } })
            if (exist) {
                return res.status(400).json({ Response: "User Already Exists" })
            }

            Section.create({
                Name: data.name,
                Designation: data.designation,
                Email: data.email,
                Password: passw,
                Committee_Head_id: typeFromId[data.type],
                is_Authorized: false


            })

        }

        if (data.role !== "user" && data.role !== "section head") {
            return res.status(400).json({ Response: "Invalid Role" })

        }
        return res.status(201).json({
            Response: "User Created",


        })
    } catch (error) {

        res.status(500).json({ Response: "Error" })

    }



})


//amal
router.post('/login', async (req, res) => {
    try {
        let data = req.body
        if (data.role === 'section head') {
            let user = await Section.findOne({ where: { Email: data.email } })
            if (user) {
                if (bcrypt.compareSync(data.password, user.Password)) {
                    //get user object 

                    let token = jwt.sign({ id: user.Section_id, role: "section head", user: user }, process.env.JWT_SECRET)
                    return res.status(200).json({ Response: "Login Successful", token: token })
                }
            }
            return res.status(400).json({ Response: "Invalid Credentials" })
        }

        if (data.role === 'committee head') {
            let user = await Committee_Head.findOne({ where: { Email: data.email } })
            if (user) {
                if (bcrypt.compareSync(data.password, user.Password)) {
                    let token = jwt.sign({ id: user.Committee_id, role: "committee head", user: user }, process.env.JWT_SECRET)
                    return res.status(200).json({ Response: "Login Successful", token: token })
                }
            }
            return res.status(400).json({ Response: "Invalid Credentials" })
        }

        if (data.role === 'user') {
            let user = await User.findOne({ where: { Email: data.email } })
            if (user) {
                if (bcrypt.compareSync(data.password, user.Password)) {
                    let token = jwt.sign({ id: user.User_id, role: "user", user: user }, process.env.JWT_SECRET)
                    return res.status(200).json({ Response: "Login Successful", token: token })
                }
            }
            return res.status(400).json({ Response: "Invalid Credentials" })
        }

        return res.status(400).json({ Response: "Invalid Role" })




    } catch (error) {
        res.status(500).json({ Response: error.message })
    }

})


//gautham
router.post('/comment/:id', (req, res) => {
    res.json({ Response: "New Commment Added" })
})

//gautham
router.put('/resolve/:id', (req, res) => {
    res.json({ Response: "Complaint Resolved" })
})

router.get('/test', (req, res) => {
    res.json({ Response: "Request successful" })
})

router.get("/pending_req", fetchUser, async (req, res) => {
    if (req.role != "committee head") {
        return res.status(403).json({ Response: "Access Denied" })
    }

    let pending_reqs = await Section.findAll({
        where: {
            is_Authorized: false
        }
    })


    res.json({ Response: "Success", pending_reqs: pending_reqs })

}
)



module.exports = router
