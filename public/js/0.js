;(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    50: function (module, exports, __webpack_require__) {
      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__
      ;(__WEBPACK_AMD_DEFINE_ARRAY__ = [
        __webpack_require__(0),
        __webpack_require__(1),
        __webpack_require__(37),
        __webpack_require__(52),
        __webpack_require__(8),
        __webpack_require__(22)
      ]),
        void 0 ===
          (__WEBPACK_AMD_DEFINE_RESULT__ = function ($, _, socketClient, md, helpers) {
            var st = {}
            function onRemoveAttachmentClick (e) {
              var self = $(e.currentTarget)
              if (_.isUndefined(self)) return !0
              var ticketId = $('#__ticketId').html(),
                attachmentId = self.attr('data-attachmentId')
              attachmentId.length > 0 &&
                ticketId.length > 0 &&
                $.ajax({
                  url: '/api/v1/tickets/' + ticketId + '/attachments/remove/' + attachmentId,
                  type: 'DELETE',
                  success: function () {
                    socketClient.ui.refreshTicketAttachments(ticketId)
                  },
                  error: function (err) {
                    var res = err.responseJSON
                    console.log('[trudesk:singleTicket:onRemoveAttachmentClick] - ' + res.error),
                      helpers.UI.showSnackbar(res.err, !0)
                  }
                })
            }
            function onRemoveCommentClick (e) {
              var self = $(e.currentTarget)
              if (_.isUndefined(self)) return !0
              var ticketId = $('#__ticketId').html(),
                commentId = self.attr('data-commentId')
              commentId.length > 0 && ticketId.length > 0 && socketClient.ui.removeComment(ticketId, commentId)
            }
            function onRemoveNoteClick (e) {
              var self = $(e.currentTarget)
              if (_.isUndefined(self)) return !0
              var ticketId = $('#__ticketId').html(),
                noteId = self.attr('data-noteid')
              noteId.length > 0 && ticketId.length > 0 && socketClient.ui.removeNote(ticketId, noteId)
            }
            return (
              (st.init = function (callback) {
                $(document).ready(function () {
                  function setupImageLink (el) {
                    var $this = $(el),
                      src = $this.attr('src')
                    $this.addClass('hasLinked')
                    var a = $('<a>')
                      .addClass('no-ajaxy')
                      .attr('href', src)
                      .attr('target', '_blank')
                    $this.wrap(a)
                  }
                  socketClient.chat.updateOnlineBubbles(),
                    helpers.setupTruTabs($('.tru-tab-selectors').find('.tru-tab-selector')),
                    $('.off-canvas-bottom').DivResizer({}),
                    $('.issue-body img:not(.hasLinked)').each(function () {
                      setupImageLink(this)
                    }),
                    $('.comment-body img:not(.hasLinked)').each(function () {
                      setupImageLink(this)
                    }),
                    $('.remove-attachment').each(function () {
                      var self = $(this)
                      self.off('click', onRemoveAttachmentClick), self.on('click', onRemoveAttachmentClick)
                    }),
                    $('.remove-comment').each(function () {
                      var self = $(this)
                      self.off('click', onRemoveCommentClick), self.on('click', onRemoveCommentClick)
                    }),
                    $('.remove-note').each(function () {
                      var self = $(this)
                      self.off('click', onRemoveNoteClick), self.on('click', onRemoveNoteClick)
                    })
                  var issueText = $('.issue-text')
                    .find('div.issue-body')
                    .html()
                  _.isUndefined(issueText) ||
                    ((issueText = (issueText = md(issueText)).trim()), $('#issueText').val(issueText))
                  var editCommentForm = $('div.edit-comment-form')
                  editCommentForm.find('form').each(function (idx, f) {
                    var form = $(f)
                    form.unbind('submit'),
                      form.submit(function ($event) {
                        if (($event.preventDefault(), !form.isValid(null, null, !1))) return !0
                        var id = $('#__ticketId').html()
                        if (id.length > 0) {
                          var comment = $($event.currentTarget)
                              .find('textarea#commentText')
                              .val(),
                            commentId = $($event.currentTarget).attr('data-commentId')
                          socketClient.ui.setCommentText(id, commentId, comment)
                        }
                      })
                  }),
                    editCommentForm.find('.resetForm').each(function (idx, item) {
                      var button = $(item)
                      button.off('click'),
                        button.on('click', function ($event) {
                          $event.preventDefault()
                          var grandParent = button.parents('div.edit-comment-form'),
                            comment = button.parents('div.ticket-comment').find('.comment-body')
                          grandParent.length > 0 && (grandParent.addClass('hide'), comment.removeClass('hide'))
                        })
                    })
                  var editNoteForm = $('div.edit-note-form')
                  if (
                    (editNoteForm.find('form').each(function (idx, f) {
                      var form = $(f)
                      form.off('submit'),
                        form.on('submit', function ($event) {
                          if (($event.preventDefault(), !form.isValid(null, null, !1))) return !0
                          var id = $('#__ticketId').text()
                          if (id.length > 0) {
                            var note = $($event.currentTarget)
                                .find('textarea#noteText')
                                .val(),
                              noteId = $($event.currentTarget).attr('data-noteId')
                            socketClient.ui.setNoteText(id, noteId, note)
                          }
                        })
                    }),
                    editNoteForm.find('.resetForm').each(function (idx, item) {
                      var button = $(item)
                      button.off('click'),
                        button.on('click', function ($event) {
                          $event.preventDefault()
                          var grandParent = button.parents('div.edit-note-form'),
                            note = button.parents('div.ticket-note').find('.comment-body')
                          grandParent.length > 0 && (grandParent.addClass('hide'), note.removeClass('hide'))
                        })
                    }),
                    'function' == typeof callback)
                  )
                    return callback()
                })
              }),
              st
            )
          }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)
    }
  }
])
