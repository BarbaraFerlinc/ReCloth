# ReCloth
## O aplikaciji
Aplikacija je namenjena prodaji in zamenjavi rabljenih oblačil. Uporabnik je lahko hkrati kupec in prodajalec, vendar mora biti za to funkcijo registriran v aplikacijo. Ko je uporabnik prijavljen v sistem, ima možnost ustvarjanja novih oglasov in urejanja že ustvarjenih. Lahko kupi artikle drugih uporabnikov ali pošlje predlog za zamenjavo artikla iz oglasa, ki bi ga zamenjal z nekim svojim artiklom. Na mail uporabnika se pošlje tudi račun nakupa in zamenjave.
## Uporabljene tehnologije
| JavaScript | Express | ReactJS | MySql | TailwindCSS | Firebase |
| :--------: | :-----: | :-----: | :---: | :---------: | :------: |
| <a href="https://developer.mozilla.org/en-US/docs/Web/javascript" title="JavaScript"><img src="https://github.com/get-icon/geticon/blob/master/icons/javascript.svg" alt="JavaScript" width="50px" height="50px"></a> | <a href="https://expressjs.com/" title="Express"><img src="https://github.com/get-icon/geticon/blob/master/icons/express.svg" alt="Express" width="50px" height="50px"></a> | <a href="https://react.dev/" title="ReactJS"><img src="https://github.com/get-icon/geticon/raw/master/icons/react.svg" alt="React" width="50px" height="50px"></a> | <a href="https://www.mysql.com/" title="MySql"><img src="https://github.com/get-icon/geticon/blob/master/icons/mysql.svg" alt="MySql" width="50px" height="50px"></a> | <a href="https://tailwindcss.com/" title="TailwindCSS"><img src="https://github.com/get-icon/geticon/raw/master/icons/tailwindcss-icon.svg" alt="MySql" width="50px" height="50px"></a> | <a href="https://www.firebase.com/" title="Firebase"><img src="https://github.com/get-icon/geticon/raw/master/icons/firebase.svg" alt="Firebase" width="50px" height="50px"></a> |
## Zagon aplikacije
Potrebna verzija `Node.js`:
```
16.20.0
```
### Zaledje (backend):
Ustvarite `node_modules` z ukazom:
```
npm install
```
Ustvarite MySql bazo in izberite mail iz katerega se bodo pošiljali maili.

Spremenite `.env` datoteko:

![app3](https://github.com/BarbaraFerlinc/ReCloth/assets/119172609/83f941e1-56b9-4249-ac00-d9e187a3cce3)

Zapolnite bazo s tabelami z ukazom:
```
node pb.js
```
Zaženite zaledje z ukazom:
```
nodemon app.js
```
Zaledje bo na `http://localhost:9000/`
### Pročelje (frontend):
Pomaknite se v mapo `notus-react-main` z ukazom:
```
cd notus-react-main
```
Ustvarite `node_modules` z ukazom:
```
npm install
```
Če še nimate ustvarjenega projekta na `FireBase` to naredite. Vzpostavite avtentikacijo uporabnika z emailom in geslom. V `Project settings/General` izberite možnost `</>` oziroma Web App in poiščite podatke svojega projekta.

Spremenite `.env` datoteko:

![app2](https://github.com/BarbaraFerlinc/ReCloth/assets/119172609/dfe1ad1c-ddfd-473e-ae32-049439cbdbda)

Zaženite pročelje z ukazom:
```
npm start
```
Pročelje bo na `http://localhost:3000`
## Avtorji
- Gašper Košenina
- Luka Prepadnik
- Barbara Ferlinc
