export interface Form {
    id: string;
    Date: any | undefined;
    KITREF_NO:string;
    Month:string;
    LENOVO_CLAIM:string;
    Customer:string;
    Machine_Type:string;
    Serial_NO:string;
    Warranty_Expiry: Date | undefined;
    Warranty_Type:string;
    DEF_FRU:string;
    DEF_SERIAL_NO:string;
    REP_FRU:string;
    REP_SNO:string;
    Problem_Reported:string;
    Action_Taken:string;
    Recieved_Date:Date | undefined;
    Remarks:string;
    userId:number;
    views: number;
   

}