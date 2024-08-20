const nodemailer = require('nodemailer')
const QRCode = require('qrcode')
require('dotenv').config()

const transporterSingleton = (() => {
  let transporterInstance
  return {
    getTransporter: function () {
      if (!transporterInstance) {
        transporterInstance = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
          }
        })
      }
      return transporterInstance
    }
  }
})()

const mailQRs = async (seats, user, movie, showtime) => {
  const time = new Date(showtime.date).toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })
  const attach = await Promise.all(
    seats.map(async (s) => {
      const qrDataURL = await QRCode.toDataURL(s.code)
      return {
        filename: `${movie.title}-${s.seat}.png`,
        content: qrDataURL.split(';base64,').pop(),
        encoding: 'base64',
        cid: s.seat
      }
    })
  )
  const transporter = transporterSingleton.getTransporter()
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: `${Math.floor(Math.random() * 100)}- Seat Booking Confirmation`,
    html: `
      <body class="bg-zinc-100 dark:bg-zinc-800 text-black dark:">
      <div class="max-w-lg mx-auto p-4" >
        <div class="bg-white dark:bg-zinc-900 shadow-lg rounded-lg p-5 flex items-center justify-between" style="display: flex; justify-content: space-between;">
          <div class="flex items-center" style="margin-right: 110px;">
            <div class="mr-4">
              <img
                src="https://chalchitra.iitmandi.ac.in/images/logo.png"
                alt="Logo"
                style="width: 100px; height: 100px;"
              />
            </div>
            <div>
              <p><strong>${movie.title}</strong></p>
              <p><strong>${time}</strong></p>
              <p><strong>Seat Numbers:</strong>${seats.map((s) => s.seat).join(', ')}</p>
            </div>
          </div>
          ${seats
            .map((s, i) => {
              return `<img
                src="cid:${s.seat}"
                alt="QR Code"
                style="width: 220px; height: 220px;"
              />`
            })
            .join('')}
        </div>
        <div class="mt-6">
            <h2 class="font-bold text-xl mb-3">Rules and Regulation</h2>
            <ol class="list-decimal pl-4">
            <li>
            <strong>Respectful Behavior:</strong> All attendees must behave
            respectfully towards others, including fellow audience members,
            organizers, and staff.
          </li>
          <li>
            <strong>No Outside Food or Drink:</strong> For cleanliness and
            safety reasons, attendees should not bring outside food or drink
            into the auditorium. Food items purchased in lobby are also not
            allowed inside auditorium.
          </li>
          <li>
            <strong>Arrival Time:</strong> Attendees are encouraged to arrive
            15 minutes before the screening time to minimize waiting
            times/disruptions once the movie starts.
          </li>
          <li>
            <strong>No Talking During the Movie:</strong> Attendees are
            requested to refrain from talking during the movie to ensure
            everyone can enjoy the film without distractions.
          </li>
          <li>
            <strong>Silence Mobile Devices:</strong> Attendees are asked to
            silence their mobile phones or set them to vibrate mode to avoid
            disruptions.
          </li>
          <li>
            <strong>Respect the Seating Arrangement:</strong> Attendees should
            sit only in designated seats and not block aisles or exits. Strict
            action would be taken if attendees are found to be sitting on
            seats not assigned to them.
          </li>
          <li>
            <strong>No Recording or Photography:</strong> The recording or
            photography of the movie screen during the screening is strictly
            prohibited. Legal action would be initiated against violators.
          </li>
          <li>
            <strong>Follow Instructions from Staff:</strong> Attendees should
            comply with any instructions given by event staff or volunteers.
          </li>
          <li>
            <strong>Children's Supervision:</strong> Parents are requested to
            supervise their children to ensure they do not disturb other
            attendees.
          </li>
          <li>
            <strong>Cleanliness:</strong> Attendees to keep the auditorium
            clean by disposing of trash properly and respecting the facility.
          </li>
          <li>
            <strong>Respect Intellectual Property:</strong> Movie being
            screened is for personal enjoyment only and not for any commercial
            purposes or distribution.
          </li>
          <li>
            <strong>Ticket Validity:</strong> Once a ticket is scanned you are
            not allowed to exit the auditorium premises, once exited ticket
            will not be valid.
          </li>
            </ol>
          </div>
        </div>
      </div>
    </body>
      `,
    attachments: attach
  }
  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Error sending email:', error, 'for', user.email)
  }
}

const membershipMail = async (membership, email) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Payment Successful',
    text: `Your payment was successful for ${membership} membership`
  }
  const transporter = transporterSingleton.getTransporter()
  await transporter.sendMail(mailOptions)
}

const mailOtp = async (otp, email, subject = 'OTP') => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: `Your OTP is ${otp}`
  }
  const transporter = transporterSingleton.getTransporter()
  await transporter.sendMail(mailOptions)
}
const mailOtpFood = async (otp, email, subject = 'OTP for Order') => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: `Your OTP for purchase of food is ${otp}`
  }
  const transporter = transporterSingleton.getTransporter()
  await transporter.sendMail(mailOptions)
}

module.exports = {
  mailer: transporterSingleton.getTransporter(),
  mailQRs,
  membershipMail,
  mailOtp,
  mailOtpFood
}
