export const calculateExpiryDate=(purchaseDate,warrantyLength)=>{
    if(!purchaseDate||!warrantyLength.trim()){
        return null;
    }

    //extract numbers and months from warrantylength "2 years",'6 months'
    
    const match=warrantyLength.trim().match(
        /^(\d+)\s*(years?|months?)$/i
    );

    if(!match){
        return null
    }
    
    const num=Number(match[1])
    const unit=match[2].toLowerCase()
    
    //creating object for date
    const expiryDate=new Date(`${purchaseDate}T12:00:00`)

    if(unit.startsWith("year")){
        expiryDate.setFullYear(expiryDate.getFullYear() + num)
    }else{
        expiryDate.setMonth(expiryDate.getMonth() + num)
    }

    return expiryDate;
}

export const getDaysRemaining=(purchaseDate,warrantyLength)=>{
    const expiryDate=calculateExpiryDate(purchaseDate,warrantyLength)

    if(!expiryDate){
        return null
    }
    const today=new Date()
    today.setHours(0,0,0,0)
    expiryDate.setHours(0,0,0,0)
    
    const daysRemaining=Math.ceil((expiryDate-today)/(1000*60*60*24))

    return daysRemaining
}

export const getWarrantyStatus=(purchaseDate,warrantyLength)=>{
    const daysRemaining=getDaysRemaining(purchaseDate,warrantyLength)

    if(daysRemaining==null){
        return {
            status:"Not Specified",
            color:"bg-gray-200 text-gray-700"
        }
    }

    if(daysRemaining<0){
        return {
            status:"Expired",
            color:"bg-red-200 text-red-700"
    
        }
    }
    if(daysRemaining<=30){
        return {
            status: "Expiring Soon",
            color: "bg-amber-200 text-amber-700"
        }
    }

    return {
        status: "Under warranty",
        color: "bg-green-200 text-green-700"
    }
}