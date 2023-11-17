import "./styles.css";

const onClickAdd = () => {

  // テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  // 入力が空かどうかをチェック
    if (inputText === '') {
      // 空の場合はアラートを表示
      alert('テキストを入力してください');
    } else {
    // 未完了リストに追加
    createIncompleteTodo(inputText);
    }
  }

// 渡された引数を元に未完了のTODOを作成する関数
const createIncompleteTodo = (todo) => {
  // li生成
  const li = document.createElement("li");

  // 「list-row」のクラスが付与されたdivを生成
  const div = document.createElement("div");
  div.className = "list-row";

  // 入力されたテキストを取得した「todo-item」のクラスが付与されたpを生成
  const p = document.createElement("p");
  p.className = "todo-item";
  p.innerText = todo;

  // button(完了)を生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 押された完了ボタンの親にあるliタグ配下の完了ボタンと削除ボタンを削除
    const moveTarget = completeButton.closest("li");
    completeButton.nextElementSibling.remove();
    completeButton.remove();
    // 戻すボタンをdiv配下に生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      // TODOの内容を取得し、未完了リストに追加
      const todoText = backButton.previousElementSibling.innerText;
      createIncompleteTodo(todoText);
      // 押された戻すボタンの親にあるliタグを削除
      backButton.closest("li").remove();
    });
    moveTarget.firstElementChild.appendChild(backButton);
    // 完了リストに移動
    document.getElementById("complete-list").appendChild(moveTarget);
  });

  // button(削除)を生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの親にあるliタグを未完了リストから削除
    const deleteTarget = deleteButton.closest("li");
    document.getElementById("incomplete-list").removeChild(deleteTarget);
  });

  // liの配下にdiv、p、button(完了・削除)を生成
  li.appendChild(div);
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // 未完了リストに追加
  const item = document.getElementById("incomplete-list").appendChild(li);
};

// 「追加」ボタンクリック時にonClickAdd関数を実行
document.getElementById("add-button").addEventListener("click", onClickAdd);