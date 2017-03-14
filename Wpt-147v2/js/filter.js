/**
 * Created by tikhonov3 on 13.03.2017.
 */

//массив данных
const data = [
    {
        cost: "39.5",
        title: "All",
        img: "images/logo_ntfs.png",
        description: "dfgdfgdfg dfg dfg gwerkgolwerg ergwg",
        // для кнопок
        linkInfo: "#",
        linkBuy: "#",
        filter: {
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
        cost: "139.5",
        title: "Partitioning & Migration",
        img: "images/logo_ntfs.png",
        description: "",
        linkInfo: "#",
        linkBuy: "",
        filter: {
            Partitioning: true,
            Migration: true,
        }
    },
    {
        cost: "5639.5",
        title: "Virtualization",
        img: "images/logo_ntfs.png",
        description: "",
        linkInfo: "#",
        linkBuy: "",
        filter: {
            Virtualization: true
        }
    }
];

$(document).ready(function () {
    const textTemplate = $("#product_item").html();
    const getElementFromTemlplate = _.template(textTemplate);
    //тестовый фильтр
    let testFilter = [
        'Virtualization',
        'Partitioning',
        'Backup',
        'Migration',
        'Restore',
        'Maintenance',
        'Bundles',
        'Optimization',
        'Security',
        'OS_interopterability',
        'Windows',
        'OS_X',
        'Linux',
        'Freeware'
    ];

    //найти все инпуты и повесить обработчик на чек
    const renderProductList = () => {
        $("#filteredBlock").html(
            // Работа с массивом
            data
                .filter(item => {
                    if (~testFilter.indexOf('All')) return true;

                    //если item.filter содержит хотябы один парметр из фильра, то отобразить
                    const isExist = testFilter.filter((checked) => item.filter[checked]);
                    if (isExist.length > 0) {
                        return true;
                    } else {
                        return false;
                    }
                })
                .map(item => getElementFromTemlplate(item))
        );
    };
    const allInputs = $('.filterblock input[name!=All]');
    const setListeners = () => {
        //Делаем  событие например  снимаем  галочку
        // Это событие сразу прогоняется через  обработчики, так  как было  change

        allInputs.on('change', function (e) {
            const filterName = e.target.name;
            const checked = e.target.checked;

            if (checked) {
                testFilter.push(filterName)
            } else {
                //Возвращает копию массива, в которой удалены все значения values.
                testFilter = _.without(testFilter, filterName);
            }
            console.log(testFilter)
            //переррендерить список
            renderProductList();
        });

        $('.filterblock input[name=All]').on('change', _.debounce((e) => {
                const checked = e.target.checked;
                //удалить обработчики чека
                allInputs.off('change');
                //прочекать все. Проходит по всему списку элементов, вызывая для каждого из них функцию
                allInputs.each((i, item) => {
                    $(item).prop('checked', checked)
                });
                if (checked) {
                    testFilter = ['Virtualization', 'Partitioning', 'Backup', 'Migration', 'Restore', 'Maintenance', 'Bundles', 'Optimization', 'Security', 'OS_interopterability', 'Windows', 'OS_X', 'Linux', 'Freeware'];
                } else {
                    testFilter = [];
                }
                //возоновить обработчики
                renderProductList();
                setListeners();
            }, 500)
        );
    };

    //первый запуск
    renderProductList();
    setListeners();
});
