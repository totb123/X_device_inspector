import tkinter as tk
from tkinter import messagebox

class QuestionApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Вопрос")
        self.root.geometry("300x150")

        self.question_label = tk.Label(self.root, text="Бракованная маркировка или нет?")
        self.question_label.pack(pady=20)

        self.true_button = tk.Button(self.root, text="True", command=self.on_true)
        self.true_button.pack(side=tk.LEFT, padx=20)

        self.false_button = tk.Button(self.root, text="False", command=self.on_false)
        self.false_button.pack(side=tk.RIGHT, padx=20)

        self.result = None  # Поле для хранения выбора

    def on_true(self):
        self.result = True
        self.root.destroy()

    def on_false(self):
        self.result = False
        self.root.destroy()


def mock_operator_question():
    root = tk.Tk()
    app = QuestionApp(root)
    root.mainloop()
    return app.result