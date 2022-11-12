<?php

//Connect To MySQL server;
$conn = mysqli_connect("127.0.0.1","root", "", "test");

//If Connection is Successfull
if($conn){
    $Login = $_POST['login'];
    $Password = $_POST['password']; // use it for HINT than hash it;
    //Hash the Password
    $hashedPassword =  md5($Password); // md5 -> Hashed and returns a String

    //If Login not uquals NULL
    if($Login){
        //CHech if the current Login exists or Not;
        $select = mysqli_query($conn, "SELECT * FROM users WHERE login = '". $_POST['login']." ' ");
        if(mysqli_num_rows($select)) {
            echo "
            <script>
                let conf = confirm('This username already exists');
                if(conf){
                    history.back(-1);
                }
            </script>
            ";
        }else{
            //Hint The Password
            $hintPass =  hintThePassword($Password);
            $sql = "INSERT INTO users(Login, Password, hint) VALUES ('$Login', '$hashedPassword', '$hintPass') ";
            // Check
            if ($conn->query($sql) === TRUE) {
            //when data inserted successfully
                echo "<script>alert('New record created successfully');</script>";
            } else {
            //We there some problem with database
                echo "<script>alert('Opps, Something goes wrong');</script>";
            }

            //select from table
            $sql2 = "SELECT id, login, password FROM users where id = (SELECT id FROM users WHERE login = '".$_POST['login']."')";
            $result = mysqli_query($conn, $sql2);

            while($row = mysqli_fetch_assoc($result)) {
                $id = $row["id"];
                $loginDB = $row["login"];
                $passwordDB = $row["password"];
            }
        }
    }else{ //When we change Sid;
        
        //Get Sid and Return Value from DB
        $sql2 = "SELECT id, login, password,hint FROM users where id = '".$_GET['sid']."' ";
        $result = mysqli_query($conn, $sql2);

        while($row = mysqli_fetch_assoc($result)) {
            $id = $row["id"];
            $loginDB = $row["login"];
            $passwordDB = $row["password"];
            $hintPass = $row["hint"];
        }
    }
}
//Hint The Password
function hintThePassword($pass){
    $str = '';
    for($x = 0; $x < strlen($pass); $x++){
        if(is_numeric($pass[$x])){
            $str .= 'N';
        }else{
            $str .= 'C';
        }
    }
    return $str;
}

//Close the connection
$conn->close();
?>
<!--HTML Page-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Information</title>
    <link rel="stylesheet" href="styles/css/main.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js"></script>
</head>
<body>
    <div class="container">
        <div class="name">Information</div>
        <div class="user-login">User Login: <span>
            <?php echo $loginDB; ?>
        </span></div>
        <div class="user-password">Password was hashed: <span>
            <?php echo $passwordDB; ?>
        </span></div>
        <div class="password-contains">Password Hint: <span>
            <?php echo $hintPass; ?>
        </span></div>
    </div>
</body>
</html>