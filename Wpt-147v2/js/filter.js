/**
 * Created by tikhonov3 on 13.03.2017.
 * Пишется  скрипт  с айдишником и  туда  ставится  темплейт из html для  каждого  блока  с  переменными <scripttype="text/template"id="product_item">
 *В  html заменяем все  названия  на  переменные в <%%>    "<%=img%>"
 Затем  берем  этот  template  и  накатываем  на  него  данные в js (  практически  как  на  сервере со  службными  синтаксисами)


 */

//массив данных. Здесь  проставляем  для  продуктов  его характеристики для  обработчиков
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
    //Создали  тег с id #product_item  находим  его  и  вызываем  оттуда текст
    const textTemplate = $("#product_item").html();
    //Далее  с  помощью  библ underscore  инициируем  template и  накатываем  данные наши
    const getElementFromTemlplate = _.template(textTemplate);
    //текстовый фильтр с массивом в  который  добавлюятся  выбранные  чекбоксы от юзера
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
            // Вызываем функцию для Работы с массивом фильтруем  его. Проходит  по  всему  массиву и прогоняет каждый id в item
            data
                .filter(item => {
                    //если  фильтр  имеет  свойство All  то  отбразить  все  иначе  поиск
                    if (~testFilter.indexOf('All')) return true;

                    //если item.filter содержит хотябы один парметр из фильра, то отобразить
                    //Проходит  по  всему  массиву  чекнутых элементов и фунция возвращает текущий  item
                    const isExist = testFilter.filter((checked) => item.filter[checked]);
                    if (isExist.length > 0) {
                        return true;
                    } else {
                        return false;
                    }
                })
                //Вернёт новый массив в getElementFromTemlplate  из массива item, c преобразованием каждого элемента item  в  template  текст для html
                .map(item => getElementFromTemlplate(item))
        );
    };
    const allInputs = $('.filterblock input[name!=All]');
    const setListeners = () => {
        //Делаем  событие например  снимаем  галочку
        // Это событие сразу прогоняется через  обработчики, так  как было  change

        allInputs.on('change', function (e) {
            //Измененное  событие в чекбоксе на  пример linux
            const filterName = e.target.name;
            const checked = e.target.checked;

            if (checked) {
                testFilter.push(filterName)
            } else {
                //Возвращает копию массива, в которой удалены все значения values.
                testFilter = _.without(testFilter, filterName);
            }
            console.log(testFilter)
            //переррендерить список (уйдет  на  78  строку)
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
