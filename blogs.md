---
layout: default
title: net.toyknight.blogs
permalink: /blogs/
---
<div class="page-content wc-container">
  	<h2>Blog Archive</h2><br/>
  	{% for post in site.posts %}
		{% if post.categories contains "blog" %}
			<!-- {% unless forloop.first %}</ul>{% endunless %} -->
  			{% capture currentyear %}{{post.date | date: "%Y"}}{% endcapture %}
  			{% if currentyear != year %}
    			<h4>{{ currentyear }}</h4>
    			<ul class="posts">
    			{% capture year %}{{currentyear}}{% endcapture %}
  			{% endif %}
    		<li><a href="{{ post.url }}">{{ post.title }}</a></li>
		{% endif %}
		{% if forloop.last %}</ul>{% endif %}
	{% endfor %}
</div>
