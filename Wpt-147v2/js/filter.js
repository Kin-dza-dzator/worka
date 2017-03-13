/**
 * Created by tikhonov3 on 13.03.2017.
 */
const data = [
    {
        cost: "39.5" , title: "All", img: "images/logo_ntfs.png", description: "dfgdfgdfg dfg dfg gwerkgolwerg ergwg", linkInfo: "#", linkBuy: "#", filter: {
        Virtualization: true,
        Partitioning: true,
        Backup: true,
        Migration: true,
        Restore: true,
        Maintenance: true,
        Bundles: true,
        Optimization: true,
        Security: true,
        OS: true,
        interopterability: true,
        Windows: true,
        OSX: true,
        Linux: true,
        Freeware: true
    }
    },
    {
        cost: "139.5" , title: "Partitioning & Migration", img: "images/logo_ntfs.png", description: "", linkInfo: "#", linkBuy: "", filter: {
        Partitioning: true,
        Migration: true,
    }
    },
    {
        cost: "5639.5" ,title: "Virtualization", img: "images/logo_ntfs.png", description: "", linkInfo: "#", linkBuy: "", filter: {
        Virtualization:true
    }
    }
];

$(document).ready(function(){
    const textTemplate = $("#product_item").html();
    const getElementFromTemlplate = _.template(textTemplate);
    //тестовый фильтр
    const TEST_FILTER = [
        // 'All',
        'Partitioning',
        // 'Virtualization'

    ];



    $("#filteredBlock").html(
        data
            .filter(item =>{
                if(~TEST_FILTER.indexOf('All')) return true;

                //если item.filter содержит хотябы один парметр из фильра, то отобразить
                const isExist = TEST_FILTER.filter((checked)=>item.filter[checked]);
                if(isExist.length > 0){
                    return true;
                }else{
                    return false;
                }
            })
            .map(item => getElementFromTemlplate(item))
    );
});
