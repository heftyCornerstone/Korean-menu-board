const menuList = document.getElementsByClassName('menu_list')[0];
const menuFilter = document.getElementsByClassName('menu-filter')[0];

const menuItems = [
    { name: '비빔밥', description: '밥 위에 나물, 고기, 고추장 등을 얹고 비벼 먹는 한국 요리' },
    { name: '김치찌개', description: '김치와 돼지고기 등을 넣고 끓인 한국의 찌개 요리' },
    { name: '불고기', description: '양념한 고기를 구워서 먹는 한국 요리' },
    { name: '떡볶이', description: '떡과 어묵을 고추장 양념에 볶아 만든 한국의 간식' },
    { name: '잡채', description: '당면과 여러 채소, 고기를 볶아 만든 한국 요리' }
];

function showVeggieToggle(){
    const toggleState = menuFilter.classList;
    if(toggleState.contains('vegetarian')){
        //채식 요리만 보여주기, 버튼 모드를 '모두 보기'로 바꾸기
        toggleState.remove('vegetarian');
        toggleState.add('no-options');
        menuFilter.innerHTML = '모두 보기';
        const menuListItems = document.getElementsByClassName('menu_list_item');
        Object.values(menuListItems).forEach((item)=>{
            if(!item.classList.contains('veggie')) item.style.display = 'none';
        });
    } else if (toggleState.contains('no-options')){
        //모든 요리 보여주기, 버튼 모드를 '채식 요리만 보기'로 바꾸기
        toggleState.remove('no-options');
        toggleState.add('vegetarian');
        menuFilter.innerHTML = '채식 요리만 보기';
        const menuListItems = document.getElementsByClassName('menu_list_item');
        Object.values(menuListItems).forEach((item)=>{
            item.style.display = 'block';
        });
    }
}

function isVeggie(sentence){
    const myRegEx = /(고기)/;
    return (sentence.match(myRegEx)) ? false : true;
}

function loadMenuBoard(menu){
    menu.map((cur)=>{
        //엘레먼트 생성하기, 클래스와 innerHTML 넣기
        const menuListItem = document.createElement('li');
        const menuListItem_title = document.createElement('h3');
        const menuListItem_con = document.createElement('p');
        
        menuListItem.classList.add('menu_list_item');
        menuListItem_title.innerHTML = cur['name'];
        menuListItem_con.innerHTML = cur['description'];

        //고기 불포함 메뉴에 veggie 클래스 추가하기
        const veggie = isVeggie(cur['description']);
        if(veggie) menuListItem.classList.add('veggie');

        //생성된 엘레먼트 DOM에 배치하기
        menuList.appendChild(menuListItem);
        menuListItem.appendChild(menuListItem_title);
        menuListItem.appendChild(menuListItem_con);
    })
}

window.onload = ()=>{
    loadMenuBoard(menuItems);
    menuFilter.addEventListener('click', showVeggieToggle)
}


// 로드 시점

// 서포트 여부