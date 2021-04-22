const User = require('../../models/User')
const UserSession = require('../../models/UserSession')
module.exports = (app) => {

  /*
  * Sign Up Portion
  */
  app.post('/api/account/signup', (req, res, next) => {
    const { body } = req;
    const {
      firstName,
      lastName,
      password
    } = body;
    let {
      email
    } = body;
    let {
      clearance
    } = body;

    if (!firstName) {
      return res.send ({
        success: false,
        message: 'Error: To sign up, your first name cannot be blank.'
      });
    }
    if (!lastName) {
      return res.send ({
        success: false,
        message: 'Error: To sign up, your last name cannot be blank.'
      });
    }
    if (!email) {
      return res.send ({
        success: false,
        message: 'Error: To sign up, your email cannot be blank.'
      });
    }
    if (!password) {
      return res.send ({
        success: false,
        message: 'Error: To sign up, your password cannot be blank.'
      });
    }

   if (!clearance) {
      return res.send ({
        success: false,
        message: 'Error: To sign up, you must identify your clearance.'
    });
  }

  /*
    End 4/21/2021 Code Merger here.
    Main issue: The error: 'Error: You must identify your clearance.' appears throughout all drop down menu options.
    What can be done? Create new rules above.
    What else? Refine saving procedure.
    ...
    Hmmm...

  */

    console.log('here');

    email = email.toLowerCase();

    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {
      return res.send ({
          success: false,
          message: 'Error: Server error'
        });
      } else if (previousUsers.length > 0) {
      return res.send ({
          success: false,
          message: 'Error: Account already exist.'
        });
      }

      //Save the new user
      const newUser = new User();

      newUser.email = email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.password = newUser.generateHash(password);
      newUser.clearance = newUser.generateHash(clearance);

      newUser.save((err, user) => {
        if (err) {
          return res.send ({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send ({
          success: true,
          message: 'Signed up'
        });
      });
    });
  });

  //Sign In
  app.post('/api/account/signin', (req, res, next) => {
    const { body } = req;
    const {
      password
    } = body;
    let {
      email
    } = body;

    //Logic Check
    let {
      clearance
    } = body;


    if (!email) {
      return res.send ({
        success: false,
        message: 'Error: To sign in, your email cannot be blank.'
      });
    }
    if (!password) {
      return res.send ({
        success: false,
        message: 'Error: To sign in, your password cannot be blank.'
      });
    }

    if (!clearance) {
      return res.send ({
        success: false,
        message: 'Error: To sign in, you must identify your clearance.'
      });
    }

    email = email.toLowerCase();

    User.find({
      email: email
    }, (err, users) => {
      if (err) {
        console.log('err 2:', err);
        return res.send ({
          success: false,
          message: 'Error: Server error'
        });
      }
      if (users.length != 1) {
        return res.send ({
          success: false,
          message: 'Error: Invalid Email'
        });
      }

      const user = users[0];

      if(!user.validPassword(password)) {
        return res.send ({
          success: false,
          message: 'Error: Invalid Password'
        });

      }
      if(!user.validClearance(clearance)) {
        return res.send ({
            success: false,
            message: 'Error: Incorrect Clearance'
        });
      }


      // Otherwise, Create User Session
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send ({
            success: false,
            message: 'Error: Server error'
          });
        }

          return res.send({
          success: true,
          message: 'Thank you!',
          token: doc._id
        });
      });
    });
  });

  app.get('/api/account/verify', (req, res, next) => {
      // Get the token
      const { query } = req;
      const { token } = query;
      // ?token=test


      // Verify the token is one of a kind and it's not deleted.

      UserSession.find({
        _id: token,
        isDeleted: false,
      }, (err, sessions) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }

        if (sessions.lenght != 1) {
          return res.send({
            success: false,
            message: 'Error: Invalid'
          });
        } else {
          return res.send({
            success: true,
            message: 'Good'
          });
        }
      });
    });

  app.get('/api/account/logout', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test


    // Verify the token is one of a kind and it's not deleted.

    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false,
    }, {
      $set: {
        isDeleted:true
      }
    }, null, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }

      return res.send({
        success: true,
        message: 'Goodbye'
      });
    });
  });
};
