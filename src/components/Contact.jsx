
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiMail,
  FiLinkedin,
  FiGithub,
  FiMapPin,
  FiSend,
  FiCheck,
  FiAlertCircle
} from 'react-icons/fi'
import { Section, Reveal } from './ui/Primitives'
import { profile, emailjsConfig } from '../data/content'
import emailjs from '@emailjs/browser'

function validate(f) {
  const e = {}

  if (!f.name.trim()) {
    e.name = 'Required'
  }

  if (!f.subject.trim()) {
    e.subject = 'Required'
  }

  if (f.message.trim().length < 10) {
    e.message = 'At least 10 characters'
  }

  return e
}

/* Ripple button */
function RippleButton({ children, disabled, type }) {
  const [ripples, setRipples] = useState([])

  function addRipple(e) {
    if (disabled) return

    const r = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const id = Date.now()

    setRipples(rs => [...rs, { x, y, id }])

    setTimeout(() => {
      setRipples(rs => rs.filter(r => r.id !== id))
    }, 700)
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={addRipple}
      className="btn-accent w-full relative overflow-hidden justify-center py-3 text-xs disabled:opacity-60"
    >
      {children}

      {ripples.map(({ x, y, id }) => (
        <span
          key={id}
          className="ripple-circle"
          style={{ left: x, top: y }}
        />
      ))}
    </button>
  )
}

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    subject: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')
  const [toast, setToast] = useState(null)

  const change = e => {
    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const blur = e => {
    const { name } = e.target

    setTouched(prev => ({
      ...prev,
      [name]: true
    }))

    setErrors(validate(form))
  }

  async function submit(e) {
    e.preventDefault()

    const validationErrors = validate(form)

    setErrors(validationErrors)
    setTouched({
      name: true,
      subject: true,
      message: true
    })

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setStatus('sending')

    try {
      await emailjs.send(
        emailjsConfig.SERVICE_ID,
        emailjsConfig.TEMPLATE_ID,
        {
          name: form.name,
          subject: form.subject,
          message: form.message
        },
        emailjsConfig.PUBLIC_KEY
      )

      setStatus('success')

      setToast({
        ok: true,
        msg: 'Message sent. Talk soon.'
      })

      setForm({
        name: '',
        subject: '',
        message: ''
      })

      setErrors({})
      setTouched({})

    } catch (error) {
      console.error('EmailJS Error:', error)

      setStatus('error')

      setToast({
        ok: false,
        msg: `Failed: ${error?.text || 'Check EmailJS configuration'}`
      })

    } finally {
      setTimeout(() => setToast(null), 4500)
      setTimeout(() => setStatus('idle'), 1600)
    }
  }

  const FIELDS = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'subject', label: 'Subject', type: 'text' }
  ]

  const LINKS = [
    {
      icon: FiMail,
      text: profile.email,
      href: profile.social.email
    },
    {
      icon: FiLinkedin,
      text: 'LinkedIn',
      href: profile.social.linkedin
    },
    {
      icon: FiGithub,
      text: 'GitHub',
      href: profile.social.github
    },
    {
      icon: FiMapPin,
      text: profile.location
    }
  ]

  return (
    <Section id="contact">
      <Reveal>
        <div className="mb-12">
          <p className="label text-white/90 tracking-[0.25em]">
            GET IN TOUCH
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            Let's Build Something Amazing
          </h2>

          <p className="mt-3 max-w-2xl text-white/60 leading-7">
            Whether you have an exciting project, internship opportunity, or just want
            to connect, I'd love to hear from you.
          </p>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left section */}
        <Reveal delay={0.05}>
          <div
            className="bento bento-glow p-7 h-full flex flex-col justify-between gap-8"
            style={{
              background:
                'linear-gradient(135deg, rgba(var(--accent-rgb),0.04) 0%, var(--card) 60%)'
            }}
          >
            <div>
              <h2
                className="text-3xl font-light leading-tight"
                style={{ color: 'var(--ink)' }}
              >
                Have an idea? <br />
                Let's turn it into reality.
              </h2>

              <p
                className="text-sm font-light mt-3 leading-relaxed"
                style={{ color: 'var(--dim)' }}
              >
                Open to freelance, internships, and full-time roles.
              </p>
            </div>

            <div className="space-y-4">
              {LINKS.map(({ icon: Icon, text, href }) => (
                <div
                  key={text}
                  className="group flex items-center gap-4 rounded-xl p-3 transition-all duration-300 hover:bg-white/5"
                >
                  <span
                    className="w-11 h-11 rounded-lg border border-violet-500/20 bg-violet-500/10 group-hover:bg-violet-500/20 flex items-center justify-center shrink-0"
                    style={{ color: 'var(--ghost)' }}
                  >
                    <Icon size={13} />
                  </span>

                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="font-mono text-xs hover:text-accent transition-colors"
                      style={{ color: 'var(--dim)' }}
                    >
                      {text}
                    </a>
                  ) : (
                    <span
                      className="font-mono text-xs"
                      style={{ color: 'var(--ghost)' }}
                    >
                      {text}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Contact form */}
        <Reveal delay={0.1}>
          <form
            onSubmit={submit}
            noValidate
            className="bento p-7 flex flex-col gap-4"
          >
            {FIELDS.map(field => (
              <div key={field.name}>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.label}
                  value={form[field.name]}
                  onChange={change}
                  onBlur={blur}
                  required
                  className={`input-glow ${
                    touched[field.name] && errors[field.name]
                      ? 'error'
                      : ''
                  }`}
                />

                {touched[field.name] && errors[field.name] && (
                  <p className="font-mono text-[10px] text-red-400 mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}

            <div>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Message"
                value={form.message}
                onChange={change}
                onBlur={blur}
                required
                className={`input-glow resize-none ${
                  touched.message && errors.message ? 'error' : ''
                }`}
              />

              {touched.message && errors.message && (
                <p className="font-mono text-[10px] text-red-400 mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            <RippleButton
              type="submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-[#050805]/40 border-t-[#050805] rounded-full animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Send Message <FiSend size={12} />
                </>
              )}
            </RippleButton>
          </form>
        </Reveal>
      </div>

      {/* Success and error notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bento px-4 py-3 font-mono text-xs"
            style={{ color: 'var(--dim)' }}
          >
            {toast.ok ? (
              <FiCheck size={13} className="text-accent" />
            ) : (
              <FiAlertCircle size={13} className="text-red-400" />
            )}

            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
