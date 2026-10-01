import { html } from '../lib/html.js';
import { sectionLabel, arrow } from './ui.js';

const planChoices = [
  { value: 'undecided', label: 'まだ分からない' },
  { value: 'light', label: 'LIGHT' },
  { value: 'standard', label: 'STANDARD' },
  { value: 'pro', label: 'PRO' },
  { value: 'other', label: 'その他' },
];

const field = ({ id, label, required, hint, control }) => html`
  <div class="field" data-field>
    <label class="field__label" for="${id}">
      ${label}${required ? html`<span class="field__req">必須</span>` : html`<span class="field__opt">任意</span>`}
    </label>
    ${hint ? html`<p class="field__hint" id="${id}-hint">${hint}</p>` : ''}
    ${control}
    <p class="field__error" id="${id}-error" data-error hidden></p>
  </div>`;

export const Contact = ({ site }) => html`
  <section class="section contact" id="contact" aria-labelledby="contact-title">
    <div class="container contact__grid">
      <div class="contact__side">
        ${sectionLabel(10, 'Contact')}
        <h2 class="display-l" id="contact-title" data-reveal>Let’s talk. <span class="contact__title-ja">無料で相談する</span></h2>
        <div class="contact__intro" data-reveal>
          <p>内容がまだ固まっていなくても大丈夫です。<br><span class="ib">「こんなページが欲しい」の一言から、</span><span class="ib">目的に合ったプランをご提案します。</span></p>
          <ul class="contact__points">
            <li>ご相談・お見積りは無料です。</li>
            <li>無理な営業はいたしません。</li>
          </ul>
        </div>
      </div>

      <div class="contact__panel" data-reveal>
        <form class="form" data-form action="${site.form.endpoint || '#contact'}" method="post" novalidate data-endpoint="${site.form.endpoint}">
          ${field({
            id: 'f-name',
            label: 'お名前',
            required: true,
            control: html`<input class="input" id="f-name" name="name" type="text" autocomplete="name" required aria-describedby="f-name-error">`,
          })}
          ${field({
            id: 'f-company',
            label: '会社名 / 店舗名',
            control: html`<input class="input" id="f-company" name="company" type="text" autocomplete="organization">`,
          })}
          ${field({
            id: 'f-email',
            label: 'メールアドレス',
            required: true,
            control: html`<input class="input" id="f-email" name="email" type="email" autocomplete="email" inputmode="email" required aria-describedby="f-email-error">`,
          })}

          <fieldset class="field field--choices" data-field>
            <legend class="field__label">希望プラン<span class="field__req">必須</span></legend>
            <div class="choices">
              ${planChoices.map(
                (c, i) => html`<label class="choice">
                  <input type="radio" name="plan" value="${c.value}"${i === 0 ? html` checked` : ''} required>
                  <span>${c.label}</span>
                </label>`,
              )}
            </div>
          </fieldset>

          ${field({
            id: 'f-message',
            label: '作りたいLPについて',
            required: true,
            hint: '目的・内容・参考サイトなど、分かる範囲でご記入ください。',
            control: html`<textarea class="input input--area" id="f-message" name="message" rows="6" required aria-describedby="f-message-hint f-message-error"></textarea>`,
          })}
          ${field({
            id: 'f-deadline',
            label: '希望納期',
            control: html`<input class="input" id="f-deadline" name="deadline" type="text" placeholder="例：11月中旬までに公開したい">`,
          })}

          <div class="form__hp" aria-hidden="true">
            <label>この欄は空欄のままにしてください<input type="text" name="_gotcha" tabindex="-1" autocomplete="off"></label>
          </div>

          <div class="form__submit">
            <button class="btn btn--primary btn--lg btn--block" type="submit" data-submit>
              <span class="btn__label" data-submit-label>この内容で送信する</span>
              <span class="btn__icon">${arrow}</span>
            </button>
            <p class="form__status" role="status" aria-live="polite" data-status></p>
          </div>
        </form>

        <div class="form-done" data-form-done tabindex="-1" hidden>
          <p class="form-done__mark" aria-hidden="true"><svg viewBox="0 0 48 48" width="48" height="48"><circle cx="24" cy="24" r="23" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m14 24.5 7 7 13-14" fill="none" stroke="currentColor" stroke-width="2"/></svg></p>
          <h3 class="form-done__title">送信が完了しました。</h3>
          <p class="form-done__text">
            お問い合わせありがとうございます。<br>
            内容を確認のうえ、下記のメールアドレス宛にご連絡いたします。
          </p>
          <p class="form-done__email" data-done-email></p>
          <p class="form-done__sub">しばらく経っても返信が届かない場合は、迷惑メールフォルダをご確認ください。</p>
          ${site.form.endpoint ? '' : html`<p class="form-done__demo">※ デモモード：送信先（src/data/site.js の form.endpoint）が未設定のため、実際には送信されていません。</p>`}
          <a class="link-cta" href="#top"><span>トップへ戻る</span>${arrow}</a>
        </div>
      </div>
    </div>
  </section>`;
