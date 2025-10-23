#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 solid_rect(vec2 st,vec2 offset,float width,float height,vec3 color){
    vec3 pct=vec3(0.0);

    float l=step(offset.x,st.x);
    float r=step(offset.x+width,st.x);
    float b=step(offset.y,st.y);
    float t=step(offset.y+height,st.y);
    vec3 rect=vec3((l-r)*(b-t));

    pct=rect*color;
    return pct;
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    vec3 color=vec3(0.0);

    vec3 white=vec3(0.9,0.9,0.8);
    vec3 red=vec3(0.7,0.,0.);
    vec3 blue=vec3(0.,0.4,0.7);
    vec3 yellow=vec3(0.9,0.7,0.);

    color+=solid_rect(st,vec2(0.,0.6),0.06,0.2,red);
    color+=solid_rect(st,vec2(0.08,0.6),0.1,0.2,red);
    color+=solid_rect(st,vec2(0.,0.82),0.06,0.2,red);
    color+=solid_rect(st,vec2(0.08,0.82),0.1,0.2,red);
    color+=solid_rect(st,vec2(0.,0.),0.18,0.58,white);

    color+=solid_rect(st,vec2(0.2,0.82),0.5,0.2,white);
    color+=solid_rect(st,vec2(0.2,0.6),0.5,0.2,white);
    color+=solid_rect(st,vec2(0.2,0.1),0.5,0.48,white);
    color+=solid_rect(st,vec2(0.2,0.),0.5,0.08,white);

    color+=solid_rect(st,vec2(0.72,0.82),0.2,0.2,white);
    color+=solid_rect(st,vec2(0.72,0.6),0.2,0.2,white);
    color+=solid_rect(st,vec2(0.72,0.1),0.2,0.48,white);
    color+=solid_rect(st,vec2(0.72,0.),0.2,0.08,blue);

    color+=solid_rect(st,vec2(0.94,0.82),0.1,0.2,yellow);
    color+=solid_rect(st,vec2(0.94,0.6),0.1,0.2,yellow);
    color+=solid_rect(st,vec2(0.94,0.1),0.1,0.48,white);
    color+=solid_rect(st,vec2(0.94,0.),0.1,0.08,blue);

    gl_FragColor=vec4(color,1.0);
}