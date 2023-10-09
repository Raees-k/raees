const SendOTP = async (recipient,ponumber, otp) => {
    const resp = await fetch(`https://po-webapi.alrashidabetong.com/api/PODetails?recepient=${recipient}&PONumber=${ponumber}&OTP=${otp}`, {
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json; odata=verbose"
        },
    });
    const data = await resp.json();
    console.log("Email Send Status",data);
    //console.log("Length of data from SQL",data == null);
    return data;
    
 }
export default SendOTP;