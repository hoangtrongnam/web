
export class AppConfigModule { 

    public static Config = {
        ROLE: [
            {
               CODE: "801",
               NAME: "Admin"
           },
           {
               CODE: "585",
               NAME: "CBNV-P.NVKQ"
           },
           {
               CODE: "584",
               NAME: "Tổ trưởng-P.NVKQ"
           },
           {
               CODE: "922",
               NAME: "Chuyên viên-P.NVKQ"
           },
           {
               CODE: "581",
               NAME: "Kiểm soát-P.NVKQ"
           },
           {
               CODE: "821",
               NAME: "CBNV-P.KTCT"
           },
           {
               CODE: "923",
               NAME: "Kiểm soát-P.KTCT"
           }
        ],
        WAREHOUSE_TYPE:[
            {
                NAME: "Kho lưu ACQT mới"
            },
            {
                NAME: "Kho lưu ACQT rách hỏng"
            },
            {
                NAME: "Kho lưu ACQT hết hạn"
            },
            {
                NAME: "Kho lưu ACQT mất"
            },
            {
                NAME: "Kho tạm ứng ACQT"
            },
            {
                NAME: "Kho đi đường ACQT"
            }
        ],
        X_6:[
            {
                ErpTransactionType: "31",
                Account: "899003",
                Product: "000",
                Customer: "00",
                CostCenter: "Z0",
                Description: "Xuất kho tiêu hủy"
            }
        ]
    }
    public static flagPage = false
    
}