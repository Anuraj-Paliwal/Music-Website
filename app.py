from flask import Flask, render_template

app=Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def landing():
    return render_template ('Music.html')

@app.route('/profile', methods=['GET', 'POST'])
def profile():
    return render_template ('profile.html')

@app.route('/search', methods=['GET', 'POST'])
def search():
    return render_template ('Search.html')

if __name__ == '__main__':
    app.run(debug=True)