//-------------------------------------------------------------
$(document).ready(function (event) {
    initializeButtons();
    initializeDropDownLists();
    initializeGrids();
    initializeDateTimePickers();
    initializeListView();

    $("#editor").kendoEditor({
        resizable: {
            content: true,
            toolbar: true
        }
    });
});
//-------------------------------------------------------------
function initializeButtons() {
    $("#animationButton1").kendoButton();
    $("#animationButton2").kendoButton();
    $("#animationButton3").kendoButton();

    $("#progressbarButton1").kendoButton();
    $("#progressbarButton2").kendoButton();
    $("#progressbarButton3").kendoButton();

    $("#customButton1").kendoButton();
    $("#customButton2").kendoButton();
    $("#customButton3").kendoButton();
    $("#customButton4").kendoButton();

    $("#framedButton1").kendoButton();
    $("#framedButton2").kendoButton();

    $("#inputTextButton1").kendoButton();
    $("#inputTextButton2").kendoButton();
    $("#inputTextButton3").kendoButton();
    $("#inputTextButton4").kendoButton();
    $("#inputTextButton5").kendoButton();
    $("#inputTextButton6").kendoButton();
    $("#inputTextButton7").kendoButton();
    $("#inputTextButton8").kendoButton();
    $("#inputTextButton9").kendoButton();

    $("#falseButton1").kendoButton();
    $("#falseButton2").kendoButton();
    $("#falseButton3").kendoButton();
    $("#falseButton4").kendoButton();
    $("#falseButton5").kendoButton();
}
//-------------------------------------------------------------
function initializeDropDownLists() {
    $("#dropDownList1").kendoDropDownList();
    $("#dropDownList2").kendoDropDownList();
    var dropDownList3 = $("#dropDownList3").kendoDropDownList();
    dropDownList3
        .data("kendoDropDownList")
        .list
        .addClass('gray');

    dropDownList3
        .data("kendoDropDownList")
        .span
        .parent()
        .addClass('roll3');

    $("#dropDownList4").kendoDropDownList();
    $("#dropDownList5").kendoDropDownList();
    $("#dropDownList6").kendoDropDownList();
    $("#js_test_select1").kendoDropDownList();
    $("#js_test_select2").kendoComboBox();
}
//-------------------------------------------------------------
function initializeGrids() {
    $(function () {

        var selectedOrders = [];
        var idField = "OrderID";

        $("#grid").kendoGrid ({
            dataSource: {
                data: [
                    {data1: "blah", data2: "blah", data3: "blah"},
                    {data1: "blah", data2: "blah", data3: "blah"},
                    {data1: "blah", data2: "blah", data3: ""},
                    {data1: "'selected'", data2: "TR", data3: "Element"},
                    {data1: "blah", data2: "blah", data3: "blah"},
                    {data1: "'overview'", data2: "Zeile", data3: ""},
                    {data1: "blah", data2: "'overview'Zelle", data3: "blah"}
                ],
                pageSize: 7,
                resizable: true,

            },

            selectable: "multiple",
            sortable: true,
            navigatable: true,
            // scrollable: false,
            scrollable: {
                virtual: true
            },
            resizable: true,
            columns: [

                {
                    field: "data1",
                    title: "blah",
                    width: 100,
                    headerAttributes: {
                        style: "text-align:center;font-weight:bold;"
                    }

                },
                {
                    field: "data2",
                    title: "blah",
                    width: 100,
                    headerAttributes: {
                        style: "text-align:center;font-weight:bold;"
                    }
                },
                {
                    field: "data3",
                    title: "blah",
                    width: 100,
                    headerAttributes: {
                        style: "text-align:center;font-weight:bold;"
                    }

                }
            ],
            change: function (e, args) {
                var grid = e.sender;
                var items = grid.items();
                items.each(function (idx, row) {
                    var idValue = grid.dataItem(row).get(idField);
                    if (row.className.indexOf("k-state-selected") >= 0) {
                        selectedOrders[idValue] = true;
                    } else if (selectedOrders[idValue]) {
                        delete selectedOrders[idValue];
                    }
                });
            },
            dataBound: function (e) {
                var grid = e.sender;
                var items = grid.items();
                var itemsToSelect = [];
                items.each(function (idx, row) {
                    var dataItem = grid.dataItem(row);
                    if (selectedOrders[dataItem[idField]]) {
                        itemsToSelect.push(row);
                    }
                });

                e.sender.select(itemsToSelect);
            }
        });
    });
}
//-------------------------------------------------------------
function initializeDateTimePickers() {
    $("#datePicker").kendoDatePicker({
        format: "dd-MM-yyyy"
    });
    $("#dateTimePicker").kendoDateTimePicker({
        value: new Date(),
        format: "dd-MM-yyyy HH:mm"
    });
}
//-------------------------------------------------------------
function initializeListView() {
    var dataSource = new kendo.data.DataSource({
        data: [
            {
                "ProductID": "PX1434",
                "ProductName": "TVPeCee HDMI-Stick Miracast/WiFi Direct/DLNA MMS-894.mira (refurbished)",
                "ProductPrice": "33,90"
            },
            {
                "ProductID": "ZX2200",
                "ProductName": 'Samsung Ultra-HD-Smart-TV UE50JU6850, 125 cm / 50", Triple-Tuner, HDR-ready',
                "ProductPrice": "999,90"
            },
            {
                "ProductID": "PX8311",
                "ProductName": "Somikon Hochauflösende USB-Webcam mit 6 LEDs, HD-Video (1280 x 1024 Pixel)",
                "ProductPrice": "12,90"
            },
            {
                "ProductID": "PX8814",
                "ProductName": 'TOUCHLET 13,3"-Tablet-PC X13.Octa mit 8-Kern-CPU, Android 5.1, Full HD',
                "ProductPrice": "289,90"
            },
            {
                "ProductID": "PX8844",
                "ProductName": 'TOUCHLET 10.1"-Tablet PC XA100.pro mit QuadCore, 3G, GPS, Android 4.4',
                "ProductPrice": "189,90"
            },
            {
                "ProductID": "PX8826",
                "ProductName": "SceneLights HDMI-LED-Mini-Clipbeamer LB-2500.mini, Mediaplayer, 60 Mumen",
                "ProductPrice": "49,90"
            }
        ]
    });

    $("#pager").kendoPager({
        dataSource: dataSource
    });

    $("#listView").kendoListView({
        dataSource: dataSource,
        selectable: "single",
        height: 100,
        template: kendo.template($("#template").html())
    });
}
