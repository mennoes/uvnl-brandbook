/* Instellingen voor de feedbackfunctie. Zie vooruitblik/feedback/README.md.
 *
 * Zonder supabaseUrl + supabaseKey draait de widget in voorbeeldmodus:
 * reacties blijven dan alleen in de eigen browser staan.
 * De "anon"/publishable key is bedoeld om openbaar te zijn; wat anonieme
 * bezoekers mogen, regelt de Row Level Security in feedback/supabase.sql.
 */
window.VB_FEEDBACK = Object.assign({
  enabled: true,          // false = widget verdwijnt (bijv. na de feedbackfase)
  supabaseUrl: '',        // bijv. https://abcdxyz.supabase.co
  supabaseKey: '',        // anon / publishable key
  table: 'comments'
}, window.VB_FEEDBACK || {});
