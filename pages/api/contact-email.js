import sgMail from "@sendgrid/mail";

export default async function contactEmail(req, res) {
  try {
    console.log("BODY: ", req.body);
    const {
      body: { email, name },
    } = req;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: "it.insuranceko@gmail.com",
      templateId: "d-1d874b1ae6664f39a20769044e1692d1",
      dynamicTemplateData: {
        name: name.split(" ")[0],
      },
    };

    // const enquiry = {
    //   to: "it.insuranceko@gmail.com", //TODO: CHANGE EMAIL, CANNOT BE SAME AS SENDER
    //   from: "it.insuranceko@gmail.com",
    //   templateId: "d-b42790cb4f70454785fe3be1ec1afb81",
    //   dynamicTemplateData: req.body,
    // };

    try {
      await sgMail.send(msg);
      // await sgMail.send(enquiry);
      res.status(200).json({ success: `Email sent to ${email}` });
    } catch (e) {
      res.status(404).json({ error: e });
    }
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
}
