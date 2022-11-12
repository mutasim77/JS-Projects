<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration</title>
    <link rel="stylesheet" href="styles/css/style.css">
</head>

<body>
    
    <div class="container">
        <div class="name">Register</div>
        <form action="connection.php" method="post" autocomplete="off">
            <div class="form-group flex">
                <input type="text" placeholder="First Name">
                <input type="text" placeholder="Last Name">
            </div>
            <input type="text" placeholder="Email">
            <input type="text" placeholder="Login" id="login" name="login">
            <input type="text" placeholder="Password" id="password" name="password">
            <button class="btn" name="submit">Register Now</button>
        </form>
    </div>

</body>

</html>