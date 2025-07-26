from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)

def init_db():
    conn = sqlite3.connect('complaints.db')
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS complaints (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT,
            subcategory TEXT,
            content TEXT
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/')
def home():
    conn = sqlite3.connect('complaints.db')
    cur = conn.cursor()
    cur.execute("SELECT * FROM complaints")
    all_complaints = cur.fetchall()
    conn.close()
    return render_template('complaint.html', complaints=all_complaints)

@app.route('/submit', methods=['POST'])
def submit():
    ctype = request.form['complaintType']
    subcat = request.form.get('subcategory', '')
    content = request.form['complaintText']

    conn = sqlite3.connect('complaints.db')
    cur = conn.cursor()
    cur.execute("INSERT INTO complaints (type, subcategory, content) VALUES (?, ?, ?)", (ctype, subcat, content))
    conn.commit()
    conn.close()
    return redirect(url_for('home'))

@app.route('/delete/<int:cid>')
def delete(cid):
    conn = sqlite3.connect('complaints.db')
    cur = conn.cursor()
    cur.execute("DELETE FROM complaints WHERE id=?", (cid,))
    conn.commit()
    conn.close()
    return redirect(url_for('home'))

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
