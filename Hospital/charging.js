// Jquery for sliding result
$(document).ready(function(){
    $("#btn1").click(function(){
        $("#result").slideDown("slow");
    });
});  
    
$(document).ready(function(){
    $("#btn2").click(function(){
        $("#result").slideUp("slow");
    });
});   


// Initialize variable
let total=0;        //final price
let text="";        //list of item with price per patient
let priceList= [4.99,6.99,3.99,1.99,1.29,4.5,5.99,0.50,1.2,0.99];  //array of price
let item =["Sliding sheet blue","Gown standard","Slipper","Specimen Container",     //array for items
            "Bandage Elastoplast","Dressing Pack","Stocking tHigh","Vomit bag emesis",
            "Nasal bolster","MRSA swab"];
let regEx = /^[a-zA-Z]+$/;  // Regular expression for only letters input
let control=0;              //control to enter value once
let purchase = 0;           //control at least 1 input is different from zero

// Function to calculate final price 
Charging = () => {
    let patient = 0;            //check if patient name is only letters
    let number = 0;             //check if input are valid
    if (control==0) {
        const patientName = document.getElementById("patient").value;  //taking patient name from input
        const quantity = document.getElementsByClassName("quantity");   //taking quantity of each item
        // Regular expression control
        if (regEx.test(patientName)==false || patientName=="") {
            alert("Please enter a name");
            patient=1;
            document.getElementById("total_price").style.display="none";
        }
        // checking number between 0 and 10
        for (let j=0; j<10; j++) {
            if (quantity[j].value>10 || quantity[j].value<0) {
                alert("Input must be between 0 and 10 and positive");
                number=1;
                document.getElementById("total_price").style.display="none";
                break;
            }
            // at least one item purchased
            if (quantity[j].value!=0) {
                purchase=1;
                break;
            }
        } 
        if (purchase==0) {
            alert("Please buy at least one item");
            document.getElementById("total_price").style.display="none";
        } else if(patient==0 && number==0) {
            document.getElementById("total_price").style.display="block";
            text = "<ul>";
            for (let i=0; i<10; i++) {
                let partial=0;
                if (quantity[i].value) {
                    partial+=priceList[i]*quantity[i].value;
                    text+= `<li> ${quantity[i].value} ${item[i]} £${partial.toFixed(2)} </li>`; 
                }
                total+=partial;
            }
            text+="</ul>";
            document.getElementById("name").innerHTML= patientName;
            document.getElementById("text").innerHTML= text;
            document.getElementById("total").innerHTML= `Total : ${total.toFixed(2)}`;
            control=1;
            }
    }
}

// Setting input with empty string
Reset = () => {
    document.getElementById("patient").value='';
    const zero = document.getElementsByClassName("quantity");
    for (let el of zero) {
        el.value="";  
    }
    total=0;
    control=0;
}

