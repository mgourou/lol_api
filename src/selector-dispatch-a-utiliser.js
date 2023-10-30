// UTILISEZ LE CONTENU DE CE FICHIER LA OÙ VOUS EN AVEZ BESOIN ET SUPPRIMEZ LE QUAND TERMINE
import { increment, decrement } from /*CHEMIN RELATIF DU SLICE A DETERMINER*/;
import { useSelector, useDispatch } from 'react-redux';

const nomADefinir = useSelector((state) => state.home.value)
const dispatch = useDispatch()

const fonctionARenommer = () => {
  dispatch(increment())
  dispatch(decrement())
}

